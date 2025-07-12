import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        enum: ['SS1', 'SS2', 'SS3'],
        default: 'SS1'
    },
    subjects: [{
        type: String,
        enum: ['English Language', 'Core Mathematics', 'Integrated Science', 'Social Studies']
    }],
    preferences: {
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'intermediate'
        },
        studyTime: {
            type: Number, // minutes per day
            default: 30
        },
        notifications: {
            type: Boolean,
            default: true
        }
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastActive on any interaction
userSchema.methods.updateActivity = function() {
    this.lastActive = new Date();
    return this.save();
};

export const User = mongoose.model('User', userSchema);