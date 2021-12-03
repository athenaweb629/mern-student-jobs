import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  }
},
{ timestamps: true });

export default mongoose.model('Post', postSchema);
