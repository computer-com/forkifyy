const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
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



module.exports = router;
