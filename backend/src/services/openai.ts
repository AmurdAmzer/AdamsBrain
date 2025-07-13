import OpenAI from 'openai';
import { config } from '../config/env';

// Initialize OpenAI client (like connecting to the AI's brain)
const openai = new OpenAI({
    apiKey: config.openai.apiKey // Use the key from our config 
});

// Function to get AI response for student questions
export async function getAIResponse(subject: string, question: string) {
    try {
        // Create a system prompt based on the subject
        // This tells the AI "who" it should be
        // Shorter prompt = less tokens = less cost
        const systemPrompt = `You are a helpful WASSCE ${subject} tutor. 
        Explain concepts clearly for West African high school students. 
        Use simple language and give examples when possible. Always make sure max_token is 150 except when the user is specific about the number of words they need or tell you to write an essay. 
        Format your responses with:
        - Clear paragraphs (use double line breaks)
        - Numbered lists where appropriate
        - Simple, clear explanations
        Keep responses concise and well-structured.`;

        // Ask the AI for help
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // The AI model (like choosing a teacher)
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            temperature: 0.7, // How creative the AI should be (0-1)
            max_tokens: 300, // Maximum length of response
            stream: true // Enable streaming for real-time response
        });

        // Return stream
        return stream; 
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to get AI response');
    }
}