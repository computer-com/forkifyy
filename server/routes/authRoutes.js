const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user: userResponse, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Must include .id or ._id
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };


// Admin/User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find user by email
      const user = await User.findOne({ email });
      console.log('Incoming email:', email);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid Email or Password' });
      }
  
      // 2. Compare password with hashed password in DB
      const isMatch = await user.authenticate(password);      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Email or Password' });
      }

  
      // 3. Return safe user object (avoid sending hashed password)
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
  
      res.status(200).json({ user: userResponse});
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
module.exports.authenticate = authenticate;

