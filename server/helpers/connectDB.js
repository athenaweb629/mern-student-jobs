import mongoose from 'mongoose';

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${connection.host}`);
}; 

export default connectDB;