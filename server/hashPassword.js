const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const hashAndSave = async () => {
  const user = await User.findOne({ email: 'customerxyz@example.com' });

  if (user) {
    const hashedPassword = await bcrypt.hash('customer123', 10);
    user.password = hashedPassword;
    await user.save();
    console.log('Customer password hashed and updated!');
  } else {
    console.log('Customer not found!');
  }

  mongoose.connection.close();
};

hashAndSave();
