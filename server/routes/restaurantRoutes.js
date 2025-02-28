const express = require('express');
const multer = require('multer');
const Restaurant = require('../models/Restaurant');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create a new restaurant (admin only)
router.post('/', auth, isAdmin, upload.array('images'), async (req, res) => {
    try {
        const restaurantData = {
            ...req.body,
            images: req.files?.map(file => ({
                url: `/uploads/${file.filename}`,
                alt: req.body.name,
                isPrimary: false
            })) || []
        };
        
        // Set the first image as primary if exists
        if (restaurantData.images.length > 0) {
            restaurantData.images[0].isPrimary = true;
        }

        // Create URL-friendly slug from name
        restaurantData.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const restaurant = new Restaurant(restaurantData);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const { cuisine, city, search } = req.query;
        const query = { isActive: true };

        if (cuisine) {
            query.cuisine = cuisine;
        }
        if (city) {
            query['address.city'] = city;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { cuisine: { $regex: search, $options: 'i' } }
            ];
        }

        const restaurants = await Restaurant.find(query)
            .select('name slug cuisine images address rating');
        res.send(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get restaurant by slug
router.get('/:slug', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ 
            slug: req.params.slug,
            isActive: true 
        });
        if (!restaurant) {
            return res.status(404).send();
        }
        res.send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update restaurant (admin only)
router.patch('/:id', auth, isAdmin, upload.array('images'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'name', 'description', 'address', 'contactNumber', 
        'email', 'openingHours', 'cuisine', 'features', 
        'paymentMethods', 'isActive'
    ];
    
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
        
        // Handle new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => ({
                url: `/uploads/${file.filename}`,
                alt: restaurant.name,
                isPrimary: false
            }));
            restaurant.images = [...restaurant.images, ...newImages];
        }

        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add/Update menu category (admin only)
router.post('/:id/categories', auth, isAdmin, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        restaurant.menuCategories.push(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add menu item (admin only)
router.post('/:id/menu', auth, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        const menuItem = {
            ...req.body,
            price: parseFloat(req.body.price),
            image: req.file ? `/uploads/${req.file.filename}` : undefined
        };

        restaurant.menuItems.push(menuItem);
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

        const menuItem = restaurant.menuItems.id(req.params.itemId);
        if (!menuItem) {
            return res.status(404).send();
        }

        Object.keys(req.body).forEach(key => {
            if (key === 'price') {
                menuItem[key] = parseFloat(req.body[key]);
            } else {
                menuItem[key] = req.body[key];
            }
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

        restaurant.menuItems.pull(req.params.itemId);
        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Set primary image (admin only)
router.patch('/:id/images/:imageIndex/primary', auth, isAdmin, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        // Reset all images to non-primary
        restaurant.images.forEach(img => img.isPrimary = false);
        
        // Set the selected image as primary
        const imageIndex = parseInt(req.params.imageIndex);
        if (restaurant.images[imageIndex]) {
            restaurant.images[imageIndex].isPrimary = true;
        }

        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete image (admin only)
router.delete('/:id/images/:imageIndex', auth, isAdmin, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }

        const imageIndex = parseInt(req.params.imageIndex);
        if (restaurant.images[imageIndex]) {
            restaurant.images.splice(imageIndex, 1);
        }

        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
