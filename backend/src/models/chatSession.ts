import mongoose from 'mongoose';


// Define the structure of a chat session (like a template for conversations)
const chatSessionSchema = new mongoose.Schema({
    userId: {
        type: String, // Stores the Firebase UID (user's ID card)
        required: true, // This field is mandatory; Every chat MUST have a user
    },
    subject: {
        type: String,
        // enum = enumeration (a fixed list of allowed values)
        // Like a dropdown menu - only these 4 subjects allowed
        enum: ['English Language', 'Core Mathematics', 'Integrated Science', 'Social Studies'],
        required: true
    },
    messages: [{ // Array of messages (like a WhatsApp chat history)
        role: {
            type: String,
            enum: ['user', 'assistant'], // Only 2 options: student or AI
            required: true
        },
        content: {
            type: String, // The actual message text
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now // Automatically set to the current date and time when the message is created
        }
    }],
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields 
})

// Create a model (think of it as a factory that creates chat sessions)
export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);