// connectDB.js
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {

    console.log("URI being used:", process.env.MONGO_URI); // ← add this
  try {
    mongoose.set('strictQuery', false); 

    console.log("Connecting to MongoDB...");

    // Simply pass the URI, no extra options needed
    const conn = await mongoose.connect(process.env.MONGO_URI,{
       serverSelectionTimeoutMS: 8000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.underline.green);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1); 
  }
};

export default connectDB;