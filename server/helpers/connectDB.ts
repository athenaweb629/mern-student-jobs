import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Preparing Database Connection...');

    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.log(error.message);
    console.log('Couldn\'t connect to MongoDB, also check your .env file.');
  }
};

export default connectDB;
