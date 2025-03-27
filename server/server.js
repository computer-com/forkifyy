const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const staffRoutes = require("./routes/staffRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const salesRoutes = require("./routes/salesRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const recentActivityRoutes = require("./routes/recentActivityRoutes");
const dashboardStatsRoutes = require("./routes/dashboardStatsRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reservationAdminRoutes = require("./routes/reservationAdminRoutes");
const settingsRoutes = require("./routes/settingsRoutes");



app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/recent-activity", recentActivityRoutes);
app.use("/api/stats", dashboardStatsRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationAdminRoutes);
app.use("/api/settings", settingsRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
