const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema({
  actionType: { type: String, required: true }, // "Order", "Reservation", "Inventory", etc.
  description: { type: String, required: true }, // e.g., "New order #1234 placed"
  timestamp: { type: Date, default: Date.now } // Auto timestamp
});

module.exports = mongoose.model("RecentActivity", recentActivitySchema);
