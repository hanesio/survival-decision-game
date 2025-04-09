import mongoose from 'mongoose';

const activeSchema = mongoose.Schema({
    stage: {
        type: String,
        enum: ['single', 'group', 'results'],
        required: true,
    },
    sessionId: {
        type: String,
        required: false,
    },
});

const Active = mongoose.model('actives', activeSchema);
export default Active;
