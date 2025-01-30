const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
}, {
    timestamps: true
});

userSchema.plugin(bcrypt, { fields: ['password'] });

module.exports = mongoose.model('User', userSchema);
