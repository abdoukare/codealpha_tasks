import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);