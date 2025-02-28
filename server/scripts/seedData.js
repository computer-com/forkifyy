const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
require('dotenv').config();

const seedData = {
    restaurants: [
        {
            name: 'Sardar Ji - Kitchener',
            slug: 'sardar-ji',
            description: 'Authentic Indian cuisine in the heart of Kitchener',
            cuisine: 'Indian',
            address: {
                street: '123 King Street',
                city: 'Kitchener',
                state: 'Ontario',
                zipCode: 'N2G 1A1',
                coordinates: {
                    latitude: 43.4516,
                    longitude: -80.4925
                }
            },
            contactNumber: '519-123-4567',
            email: 'info@sardarji.com',
            menuCategories: [
                { name: 'Starters', displayOrder: 1 },
                { name: 'Main Course', displayOrder: 2 },
                { name: 'Breads', displayOrder: 3 }
            ],
            menuItems: [
                {
                    name: 'Samosa',
                    description: 'Crispy pastry filled with spiced potatoes and peas',
                    price: 6.99,
                    category: 'Starters',
                    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=200',
                    isVegetarian: true,
                    spicyLevel: 1
                },
                {
                    name: 'Paneer Tikka',
                    description: 'Grilled cottage cheese with Indian spices',
                    price: 12.99,
                    category: 'Starters',
                    image: 'https://images.unsplash.com/photo-1599487488170-b09ffa7efe2b?q=80&w=200',
                    isVegetarian: true,
                    spicyLevel: 2
                },
                {
                    name: 'Butter Chicken',
                    description: 'Tender chicken in rich tomato-based curry',
                    price: 16.99,
                    category: 'Main Course',
                    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=200',
                    spicyLevel: 1
                },
                {
                    name: 'Dal Makhani',
                    description: 'Black lentils cooked overnight with cream',
                    price: 14.99,
                    category: 'Main Course',
                    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200',
                    isVegetarian: true,
                    spicyLevel: 1
                }
            ],
            openingHours: {
                monday: { open: '11:00', close: '22:00' },
                tuesday: { open: '11:00', close: '22:00' },
                wednesday: { open: '11:00', close: '22:00' },
                thursday: { open: '11:00', close: '22:00' },
                friday: { open: '11:00', close: '23:00' },
                saturday: { open: '11:00', close: '23:00' },
                sunday: { open: '11:00', close: '22:00' }
            },
            features: ['Delivery', 'Takeout', 'Dine-in'],
            paymentMethods: ['Cash', 'Credit Card', 'Debit Card']
        },
        {
            name: 'The Italian Table',
            slug: 'italian-table',
            description: 'Authentic Italian dining experience',
            cuisine: 'Italian',
            address: {
                street: '456 Weber Street',
                city: 'Waterloo',
                state: 'Ontario',
                zipCode: 'N2L 4E6',
                coordinates: {
                    latitude: 43.4643,
                    longitude: -80.5204
                }
            },
            contactNumber: '519-987-6543',
            email: 'info@italiantable.com',
            menuCategories: [
                { name: 'Antipasti', displayOrder: 1 },
                { name: 'Pasta', displayOrder: 2 },
                { name: 'Pizzas', displayOrder: 3 }
            ],
            menuItems: [
                {
                    name: 'Bruschetta',
                    description: 'Toasted bread with tomatoes and basil',
                    price: 8.99,
                    category: 'Antipasti',
                    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200',
                    isVegetarian: true
                },
                {
                    name: 'Margherita Pizza',
                    description: 'Fresh tomatoes, mozzarella, and basil',
                    price: 16.99,
                    category: 'Pizzas',
                    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200',
                    isVegetarian: true
                }
            ],
            openingHours: {
                monday: { open: '12:00', close: '21:00' },
                tuesday: { open: '12:00', close: '21:00' },
                wednesday: { open: '12:00', close: '21:00' },
                thursday: { open: '12:00', close: '21:00' },
                friday: { open: '12:00', close: '22:00' },
                saturday: { open: '12:00', close: '22:00' },
                sunday: { open: '12:00', close: '21:00' }
            },
            features: ['Dine-in', 'Takeout', 'Outdoor Seating'],
            paymentMethods: ['Cash', 'Credit Card', 'Debit Card']
        }
    ]
};

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Restaurant.deleteMany({});
        console.log('Cleared existing restaurants');

        // Insert new data
        await Restaurant.insertMany(seedData.restaurants);
        console.log('Sample restaurants added successfully');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();
