import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['seeker', 'employer'],
        default: 'seeker',
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;