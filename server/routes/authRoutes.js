const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

// Sign-In or Auto-Register Route (No password)
router.post('/signin', async (req, res) => {
  const { firstName, lastName, email, phone, countryCode } = req.body;
  console.log("📦 Body received:", req.body);

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Register new user
      user = new User({
        name: `${firstName} ${lastName}`,
        email,
        phone: `${countryCode}${phone}`,
        role: 'customer'
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with token and basic user info
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error('Sign In Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/manager', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Incoming login for:", email);

    const manager = await User.findOne({ email, role: 'manager' });
    if (!manager) {
      console.log("❌ Manager not found");
      return res.status(404).json({ error: 'Manager not found' });
    }

    console.log("✅ Manager found:", manager.email);
    console.log("🔐 Comparing password...");

    const isMatch = await require('bcrypt').compare(password, manager.password);
    if (!isMatch) {
      console.log("❌ Password incorrect");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = require('jsonwebtoken').sign(
      { userId: manager._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("🎫 JWT token generated");

    res.status(200).json({
      token,
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
        restaurantId: manager.restaurantId,
      },
    });

  } catch (err) {
    console.error("🔥 Server error in /manager route:", err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});



module.exports = router;
