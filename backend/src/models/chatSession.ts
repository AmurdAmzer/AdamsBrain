import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        enum: ['English Language', 'Core Mathematics', 'Integrated Science', 'Social Studies'],
        required: true
    },
    messages: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields 
})

export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);