const express = require('express');
const multer = require('multer');
const Restaurant = require('../models/Restaurant');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update restaurant details (admin only)
router.patch('/:id', auth, isAdmin, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'address', 'contactNumber', 'email', 'openingHours'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        updates.forEach(update => restaurant[update] = req.body[update]);
        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add/Update menu item (admin only)
router.post('/:id/menu', auth, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        const menuItem = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : undefined
        };

        restaurant.menu.push(menuItem);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update menu item (admin only)
router.patch('/:id/menu/:itemId', auth, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        const menuItem = restaurant.menu.id(req.params.itemId);
        if (!menuItem) {
            return res.status(404).send();
        }

        Object.keys(req.body).forEach(update => {
            menuItem[update] = req.body[update];
        });

        if (req.file) {
            menuItem.image = `/uploads/${req.file.filename}`;
        }

        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete menu item (admin only)
router.delete('/:id/menu/:itemId', auth, isAdmin, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        restaurant.menu.pull(req.params.itemId);
        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
