import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employeeLocation: {
    type: String,
  },
  qualificationLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'],
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
},
{ timestamps: true });

export default mongoose.model('Post', postSchema);
