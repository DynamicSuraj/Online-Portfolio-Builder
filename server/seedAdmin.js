const mongoose = require('mongoose');
   const User = require('./models/User');
   const bcrypt = require('bcryptjs');
   const connectDB = require('./config/db');
   const dotenv = require('dotenv');

   // Load environment variables from .env file
   dotenv.config();

   const seedAdmin = async () => {
     await connectDB();
     const email = 'admin@example.com';
     const password = 'admin123';
     const name = 'Admin User';

     try {
       let user = await User.findOne({ email });
       if (user) {
         console.log('Admin user already exists');
         return;
       }

       user = new User({
         name,
         email,
         password,
         isAdmin: true,
       });

       await user.save();
       console.log('Admin user created');
       mongoose.connection.close();
     } catch (error) {
       console.error('Error creating admin:', error);
       mongoose.connection.close();
     }
   };

   seedAdmin();