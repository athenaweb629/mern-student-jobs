import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Preparing Database Connection...');
    
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    console.log('Couldn\'t connect to MongoDB, check your .env file.');
  }
};

export default connectDB;
