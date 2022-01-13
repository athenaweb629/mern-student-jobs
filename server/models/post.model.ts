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
    enum: ['On-site', 'Remote', 'Hybrid'],
  },
  qualificationLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'],
    required: true,
  },
  availability: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer', 'Internship'],
    required: true,
  },
  author: {
    type: Object,
    name: String,
    mail: String,
    required: true,
  },
  skills: [{
    type: String
  }],
},
{ timestamps: true });

export default mongoose.model('Post', postSchema);
