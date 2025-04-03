const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Sign-In SSO Google. 
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Google token is required' });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email, sub: googleId, picture } = ticket.getPayload();

    // Find or create user
    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    
    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email,
        googleId,
        isGoogleSigned: true,
        role: 'user',
        profileImage: picture,
        verified: true
      });
      await user.save();
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { 
        userId: user._id,
        role: user.role 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' } 
    );

    // Secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    // Setting cookie and send response
    res.cookie('token', jwtToken, cookieOptions)
       .status(200)
       .json({
         success: true,
         user: {
           id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
           profileImage: user.profileImage
         }
       });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

router.post('/manager', async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await User.findOne({ email, role: 'manager' });
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }


    const isMatch = await require('bcrypt').compare(password, manager.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = require('jsonwebtoken').sign(
      { userId: manager._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );


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
// Owner Registration Route
router.post('/owner/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📩 Incoming owner registration:", { name, email }); // Debug log

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already in use:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const owner = new User({
      name,
      email,
      password: hashedPassword,
      role: 'owner',
    });
    await owner.save();
    console.log("✅ Owner registered:", owner.email);

    const token = jwt.sign(
      { userId: owner._id, role: owner.role }, // Include role in token for consistency
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Match expiration with other routes
    );

    res.status(201).json({
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
      }
    });
  } catch (error) {
    console.error("🔥 Error in owner registration:", error);
    res.status(500).json({ error: error.message });
  }
});

// Existing owner sign-in route
router.post('/owner', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Incoming owner login:", email);

    const owner = await User.findOne({ email, role: 'owner' });
    if (!owner) {
      console.log("❌ Owner not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      console.log("❌ Password incorrect");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: owner._id, role: owner.role }, // Include role in token
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("🎫 JWT token generated for owner");

    res.json({
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
      }
    });
  } catch (error) {
    console.error("🔥 Error in owner login:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
