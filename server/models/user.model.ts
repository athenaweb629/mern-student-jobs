import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 'subscriber',
  },
  resetPasswordToken: {
    type: String,
    default: '',
    required: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
},
{ timestamps: true });

export default mongoose.model('User', userSchema);
