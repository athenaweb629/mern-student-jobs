import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  image: Buffer,
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
  about: {
    type: String
  },
  industry: String,
  password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 'student',
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
  tags: [{
    type: String
  }],
  experience: [{
    isActive: Boolean,
    employmentType: String,
    industry: String,
    company: String,
    startDate: Date,
    endDate: Date || false,
    description: String,
    location: String,
  }],
  education: [{
    school: String,
    fieldOfStudy: String,
    location: String,
    degree: String,
    startDate: Date,
    endDate: Date,
    grade: String,
    description: String,
  }],
  licencesAndCertifications: [{
    type: String,
  }],
  websites: [{
    type: String,
    url: String,
  }],
  skills: [{
    type: String,
    name: String,
    passedSkillTest: Boolean,
    isTopSkill: Boolean,
  }],
  projects: [{
    title: String,
    startDate: Date,
    endDate: Date,
    url: String,
    description: String,
  }],
  posts: [{
    type: String,
  }],
},
{ timestamps: true });

export default mongoose.model('User', userSchema);
