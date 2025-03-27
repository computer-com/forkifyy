const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');
const { authenticate } = require('./authRoutes'); // Ensure user is logged in

// Update Profile Information
router.put('/profile', authenticate, async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, phone, address },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Change Password
router.put('/password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect current password' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Replace with actual user ID or extract from session/token
  const userId = "adminUserIdHere";

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect current password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Business Information Settings
router.put('/business', authenticate, async (req, res) => {
  const { businessName, businessHours, businessContact } = req.body;
  try {
    const updatedBusiness = await User.findByIdAndUpdate(
      req.user.id,
      { businessName, businessHours, businessContact },
      { new: true }
    );
    res.json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User Management (Only Admins can manage users)
router.get('/users', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ error: 'Access Denied' });

    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
