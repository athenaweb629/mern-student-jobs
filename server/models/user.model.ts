import mongoose from 'mongoose';
// import crypto from 'crypto';

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
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 'subscriber',
  },
  resetPasswordLink: {
    data: String,
    default: '',
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
},
{ timestamps: true });

// userSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// userSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function(password) {
//     if (!password) return '';

//     try {
//       return crypto.createHmac('sha1', this.salt) .update(password).digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },

//   makeSalt: function() {
//     return Math.round(new Date().valueOf() * Math.random()) + '';
//   }
// };

export default mongoose.model('User', userSchema);
