const express = require("express");
const router = express.Router();
const RecentActivity = require("../models/RecentActivity");

// Get all recent activities (Sorted by latest)
router.get("/", async (req, res) => {
  try {
    const activities = await RecentActivity.find().sort({ timestamp: -1 }).limit(10); // Get last 10 activities
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent activities" });
  }
});

// Add a new activity
router.post("/", async (req, res) => {
  try {
    const { actionType, description } = req.body;
    const newActivity = new RecentActivity({ actionType, description });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: "Failed to log activity" });
  }
});

module.exports = router;
