import mongoose from 'mongoose';

// This tracks how well a student is doing in each subject
const userProgressSchema = new mongoose.Schema({
    userId: {
        type: String, // Firebase UID (same as in ChatSession)
        required: true
    },
    subject: {
        type: String,
        enum: ['English Language', 'Core Mathematics', 'Integrated Science', 'Social Studies'],
        required: true
    },
    metrics: {
        // Think of this like your game stats
        totalQuestions: {
            type: Number,
            default: 0 // How many questions asked
        },
        correctAnswers: {
            type: Number,
            default: 0 // How many they got right
        },
        timeSpent: {
            type: Number,
            default: 0 // Minutes spent studying
        },
        currentStreak: {
            type: Number,
            default: 0 // Days in a row they've studied
        },
        lastStudied: {
            type: Date,
            default: Date.now // When they last used the app
        }
    },
    weakAreas: [{
        type: String // Topics they struggle with (e.g., "Algebra", "Grammar")
    }]
}, {
    timestamps: true
});

// Compound index: ensures one progress record per user per subject
userProgressSchema.index({ userId: 1, subject: 1 }, { unique: true });

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);