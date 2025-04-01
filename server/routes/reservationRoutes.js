const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { auth, isAdmin } = require('../middleware/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Email setup with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create a new reservation with confirmation email
router.post('/', auth, async (req, res) => {
  try {
    console.log('User making reservation:', req.user.email);
    const { restaurantId, date, time, numberOfGuests, specialRequests, email, name } = req.body;

    const reservation = new Reservation({
      restaurantId,
      date,
      time,
      numberOfGuests,
      specialRequests,
      userId: req.user._id,
      status: 'pending',
    });

    await reservation.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmation - ForkiFy',
      html: `
      <div style="font-family: 'Segoe UI', sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #ff6f00;">🍽️ ForkiFy Reservation Confirmed!</h2>
        <p>Hi <strong>${name}</strong>,</p>

        <p>Your table has been successfully booked and we can’t wait to host you!</p>

        <div style="margin: 15px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #ff6f00;">
          <p><strong>📅 Date:</strong> ${new Date(date).toDateString()}</p>
          <p><strong>⏰ Time:</strong> ${time}</p>
          <p><strong>👥 Number of Guests:</strong> ${numberOfGuests}</p>
        </div>

        <p>Feel free to dress casual, bring your appetite, and leave the rest to us.</p>

        <p style="margin-top: 20px;">💌 If you have any questions, just reply to this email.</p>

        <p>See you soon,<br/><strong>The ForkiFy Team</strong> 🍴</p>

        <hr style="margin: 20px 0;" />

        <small style="color: #999;">This is a system-generated email. For any support, visit our help center at forkify.support/contact</small>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: 'Reservation successful and email sent.', reservation });
  } catch (error) {
    console.error("Detailed Error:", error);
    res.status(400).send({
      error: 'Reservation failed or email could not be sent.',
      details: error.message,
      stack: error.stack
    });
  }
});

// Get all reservations for a restaurant (admin only)
router.get('/restaurant/:restaurantId', auth, isAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      restaurantId: req.params.restaurantId,
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
    const reservations = await Reservation.find({ userId: req.user._id })
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
    if (!reservation) return res.status(404).send();

    reservation.status = req.body.status;
    if (req.body.tableNumber) reservation.tableNumber = req.body.tableNumber;

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
      userId: req.user._id,
    });

    if (!reservation) return res.status(404).send();
    if (reservation.status === 'cancelled')
      return res.status(400).send({ error: 'Reservation is already cancelled' });

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
    if (!date) return res.status(400).send({ error: 'Date is required' });

    const existingReservations = await Reservation.find({
      restaurantId: req.params.restaurantId,
      date: new Date(date),
      status: { $ne: 'cancelled' },
    });

    const timeSlots = [
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00',
    ];

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