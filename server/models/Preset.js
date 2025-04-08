import mongoose from 'mongoose';

const presetSchema = mongoose.Schema({
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
});

const Preset = mongoose.model('presets', presetSchema);
export default Preset;
