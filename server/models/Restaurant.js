const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
    isVegetarian: { type: Boolean, default: false },
    spicyLevel: { type: Number, min: 0, max: 3, default: 0 }, // 0: Not Spicy, 1: Mild, 2: Medium, 3: Hot
    allergens: [String],
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbohydrates: Number,
        fat: Number
    }
});

const menuCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    displayOrder: { type: Number, default: 0 }
});

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // for URL-friendly names
    description: { type: String },
    cuisine: { type: String, required: true }, // e.g., Indian, Italian, etc.
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    images: [{
        url: String,
        alt: String,
        isPrimary: Boolean
    }],
    menuCategories: [menuCategorySchema],
    menuItems: [menuItemSchema],
    openingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    },
    features: [{
        type: String,
        enum: ['Delivery', 'Takeout', 'Dine-in', 'Outdoor Seating', 'Wheelchair Accessible', 'Parking']
    }],
    paymentMethods: [{
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI']
    }],
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

// Create indexes for efficient querying
restaurantSchema.index({ slug: 1 });
restaurantSchema.index({ 'address.city': 1 });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ isActive: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);