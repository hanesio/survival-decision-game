import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    sessionname: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
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
    comment: {
        type: String,
        required: false,
    },
});

const Session = mongoose.model('sessions', sessionSchema);
export default Session;
