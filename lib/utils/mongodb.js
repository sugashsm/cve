import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
      }
      console.log('MongoDB connected!');
      
};

