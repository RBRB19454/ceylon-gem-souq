require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = 'admin@gemwork.com';
    const adminExists = await User.findOne({ email });

    if (adminExists) {
      console.log(`Admin user with email ${email} already exists.`);
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log(`Updated user ${email} to admin role.`);
      }
    } else {
      const admin = await User.create({
        name: 'Ceylon Gem Admin',
        email,
        password: 'adminpassword123',
        role: 'admin',
        phone: '+94111222333',
        preferredLanguage: 'en',
        isVerified: true,
      });
      console.log(`Admin user created successfully!`);
      console.log(`Email: ${email}`);
      console.log(`Password: adminpassword123`);
    }

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
