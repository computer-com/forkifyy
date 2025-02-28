const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { auth, isAdmin } = require('../middleware/auth');

// Create a new reservation
router.post('/', auth, async (req, res) => {
    try {
        const reservation = new Reservation({
            ...req.body,
            userId: req.user._id,
            status: 'pending'
        });
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all reservations for a restaurant (admin only)
router.get('/restaurant/:restaurantId', auth, isAdmin, async (req, res) => {
    try {
        const reservations = await Reservation.find({ 
            restaurantId: req.params.restaurantId 
        })
        .populate('userId', 'name email')
        .sort({ date: 1, time: 1 });
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user's reservations
router.get('/user', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find({ 
            userId: req.user._id 
        })
        .populate('restaurantId', 'name')
        .sort({ date: -1 });
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update reservation status (admin only)
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send();
        }
        
        reservation.status = req.body.status;
        if (req.body.tableNumber) {
            reservation.tableNumber = req.body.tableNumber;
        }
        
        await reservation.save();
        res.send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Cancel reservation (user can cancel their own reservation)
router.patch('/:id/cancel', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        
        if (!reservation) {
            return res.status(404).send();
        }
        
        if (reservation.status === 'cancelled') {
            return res.status(400).send({ error: 'Reservation is already cancelled' });
        }
        
        reservation.status = 'cancelled';
        await reservation.save();
        res.send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get available time slots for a specific date
router.get('/available-slots/:restaurantId', auth, async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send({ error: 'Date is required' });
        }

        // Get all reservations for the specified date
        const existingReservations = await Reservation.find({
            restaurantId: req.params.restaurantId,
            date: new Date(date),
            status: { $ne: 'cancelled' }
        });

        // Define available time slots (you may want to make this configurable per restaurant)
        const timeSlots = [
            '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
            '20:00', '20:30', '21:00'
        ];

        // Filter out times that are fully booked
        // Assuming each time slot can have maximum 10 reservations
        const availableSlots = timeSlots.filter(time => {
            const reservationsAtTime = existingReservations.filter(r => r.time === time);
            return reservationsAtTime.length < 10;
        });

        res.send(availableSlots);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
