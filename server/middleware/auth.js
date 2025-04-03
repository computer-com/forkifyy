const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Optional chaining
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ 
            _id: decoded.userId,
        });

        if (!user) throw new Error('User not found');

        // For Google-signed users
        if (user.isGoogleSigned) {
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: error.message || 'Please authenticate.' });
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Access denied. Admin only.' });
    }
    next();
};
const isOwner = async (req,res,next )=>{
    if (req.user.role !== 'owner'){
        return res.status(403).send({ error: 'Access denied. Owner only.' });
    }
    next();
}

module.exports = { auth, isAdmin, isOwner };