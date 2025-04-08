import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    groupname: {
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
    members: {
        type: [String],
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
});

const Group = mongoose.model('groups', groupSchema);
export default Group;
