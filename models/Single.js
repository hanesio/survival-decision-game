import mongoose from 'mongoose';

const singleSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    items: {
        type: [
            {
                description: String,
                explanation: String,
                rank: Number,
            },
        ],
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: false,
    },
    result: {
        type: Number,
        required: true,
    },
});

const Single = mongoose.model('singles', singleSchema);
export default Single;
