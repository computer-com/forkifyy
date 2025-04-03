const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // ✅ MUST be here for bcrypt to work
    phone: { type: String }, // Optional
    role: {
      type: String,
      enum: ['admin', 'user', 'customer', 'manager', 'owner'],
      default: 'customer',
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    googleId: String,
    isGoogleSigned: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
