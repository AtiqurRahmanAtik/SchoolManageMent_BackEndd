import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './app/modules/User/Users.model.js'; 
import connectDB from './config/db.js'; // Adjust path if needed


dotenv.config();

const createFirstUser = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log('✅ Database connected.');

    // 2. Define Admin Data (Matching your UserSchema EXACTLY)
    const adminData = {
      email: 'atik@gmail.com',
      password: '12345678', 
      phone: '01700000000',
      role: 'admin',   
      status: 'active',
      branch: 'demo',
    };

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email: adminData.email });
    
    if (existingUser) {
      console.log(`⚠️  User with email ${adminData.email} already exists.`);
      return; 
    }

    // 4. Create and Save the User

    const newUser = new User(adminData);
    await newUser.save();

    // 5. Success Logging
    console.log('\n=========================================');
    console.log(`✅ SUPER ADMIN CREATED SUCCESSFULLY`);
    console.log(`📧 Email:    ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log(`🏢 Branch:   ${adminData.branch}`);
    console.log(`🛡️  Role:     ${adminData.role}`);
    console.log('=========================================\n');

  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    if (error.name === 'ValidationError') {
        // This will print exact details if a required field is missing
        console.error('Details:', error.errors); 
    }
    process.exit(1);
  } finally {
    // 6. Cleanup: Always disconnect when done
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        console.log('- Database disconnected.');
    }
    process.exit(0);
  }
};

createFirstUser();