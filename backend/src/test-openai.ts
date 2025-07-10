// Import our OpenAI service
import { getAIResponse } from './services/openai';
import { config } from './config/env';

// Simple test function
async function testOpenAI() {
    console.log('Testing OpenAI connection...\n');
    
    // Check if API key exists
    if (!config.openai.apiKey) {
        console.error('No API key found! Check your .env file');
        return;
    }
    
    try {
        // Test with a simple math question
        console.log('Subject: Core Mathematics');
        console.log('Question: What is 2 + 2?');
        console.log('Waiting for AI response...\n');
        
        const response = await getAIResponse('Core Mathematics', 'What is 2 + 2?');
        
        console.log('AI Response:', response);
        console.log('\nOpenAI is working correctly!');
        
    } catch (error) {
        console.error('Error:', error);
        console.log('\nTips:');
        console.log('1. Check if your API key is correct');
        console.log('2. Make sure you have internet connection');
        console.log('3. Verify you have credits in your OpenAI account');
    }
}

// Run the test
testOpenAI();