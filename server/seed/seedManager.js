const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

dotenv.config();

const seedManagers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for manager seeding.");

    const restaurants = await Restaurant.find();

    const managers = [
      {
        name: 'Manager One',
        email: 'manager1@graffiti.com',
        password: 'graffiti123',
        role: 'manager',
        restaurantName: 'Graffiti Market',
      },
      {
        name: 'Manager Two',
        email: 'manager2@milestones.com',
        password: 'milestone456',
        role: 'manager',
        restaurantName: 'Milestones Grill + Bar',
      },
      {
        name: 'Manager Three',
        email: 'manager3@plazasushi.com',
        password: 'plaza789',
        role: 'manager',
        restaurantName: 'Plaza Sushi Downtown',
      },
      {
        name: 'Manager Four',
        email: 'manager4@twhbar.com',
        password: 'twh101',
        role: 'manager',
        restaurantName: 'TWH Social Bar & Bistro',
      },
      {
        name: 'Manager Five',
        email: 'manager5@isabelle.com',
        password: 'isa202',
        role: 'manager',
        restaurantName: 'Isabelle Restaurant + Lounge',
      },
      {
        name: 'Manager Six',
        email: 'manager6@jacobsgrill.com',
        password: 'jacob303',
        role: 'manager',
        restaurantName: 'Jacobs Grill',
      },
      {
        name: 'Manager Seven',
        email: 'manager7@spiceroute.com',
        password: 'spice404',
        role: 'manager',
        restaurantName: 'The Spice Route',
      },
    ];

    for (let manager of managers) {
      const existing = await User.findOne({ email: manager.email });
      if (existing) {
        console.log(`Skipped: ${manager.email} already exists.`);
        continue;
      }

      const restaurant = restaurants.find(r => r.name === manager.restaurantName);
      if (!restaurant) {
        console.warn(`Restaurant "${manager.restaurantName}" not found. Skipping manager ${manager.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(manager.password, 10);
      await User.create({
        name: manager.name,
        email: manager.email,
        password: hashedPassword,
        role: manager.role,
        restaurantId: restaurant._id,
      });

      console.log(`Manager created: ${manager.email}`);
    }

    console.log("🎉 All managers seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding managers:", error);
    process.exit(1);
  }
};

seedManagers();
