import mongoose from 'mongoose';

const activeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', activeSchema);
export default User;
