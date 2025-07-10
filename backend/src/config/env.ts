// This file safely loads your secret keys
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export configuration (with validation)
export const config = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY || ''
    },
    mongodb: {
        uri: process.env.MONGODB_URI || ''
    },
    port: process.env.PORT || 5000
};

// Check if required keys exist
if (!config.openai.apiKey) {
    console.error('⚠️  OPENAI_API_KEY is missing in .env file');
}