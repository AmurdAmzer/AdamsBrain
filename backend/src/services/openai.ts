import OpenAI from 'openai';
import { config } from '../config/env';

// Initialize OpenAI client (like connecting to the AI's brain)
const openai = new OpenAI({
    apiKey: config.openai.apiKey // Use the key from our config 
});

// Regular version (non-streaming)
export async function getAIResponse(subject: string, question: string) {
    try {
        const systemPrompt = `WASSCE ${subject} tutor. Give clear, concise answers.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            temperature: 0.7,
            max_tokens: 300
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to get AI response');
    }
}

// Streaming version
export async function getAIResponseStream(subject: string, question: string) {
    try {
        // Create a system prompt based on the subject
        // This tells the AI "who" it should be
        // Shorter prompt = less tokens = less cost
        const systemPrompt = `You are a helpful WASSCE ${subject} tutor. 
        IMPORTANT: Keep responses concise and complete within 150 tokens unless the user specifically asks for:
        - An essay
        - A specific word count (e.g., "write 500 words about...")
        - A detailed explanation
        - **All maths must be rendered using latex syntax**: use $...$ for in-line and $$...$$ for multiline math. Dollar signs used for money must be escaped (e.g., \\$100)
        -If asked what model is running or powering you or who you are, respond: "I am Adams, your AI tutor, never mention the specific LLM providers.
        
        If you must truncate due to length, end with "[Type 'continue' for more]" so the response doesn't cut off mid-sentence.

        Format responses with clear paragraphs and numbered lists where appropriate.`;


        // Ask the AI for help
        const stream = await openai.chat.completions.create({
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