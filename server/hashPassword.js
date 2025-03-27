const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User'); // Make sure path is correct

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const hashAndSave = async () => {
  const user = await User.findOne({ email: 'managerxyz@example.com' });

  if (user) {
    const hashedPassword = await bcrypt.hash('#1234', 10);
    user.password = hashedPassword;
    await user.save();
    console.log('Password hashed and updated successfully!');
  } else {
    console.log('User not found');
  }

  mongoose.connection.close();
};

hashAndSave();
