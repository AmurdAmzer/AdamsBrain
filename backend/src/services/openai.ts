import OpenAI from 'openai';

// Initialize OpenAI client (like connecting to the AI's brain)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

// Function to get AI response for student questions
export async function getAIResponse(subject: string, question: string) {
    try {
        // Create a system prompt based on the subject
        // This tells the AI "who" it should be
        const systemPrompt = `You are a helpful WASSCE ${subject} tutor. 
        Explain concepts clearly for West African high school students. 
        Use simple language and give examples when possible.`;

        // Ask the AI for help
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // The AI model (like choosing a teacher)
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            temperature: 0.7, // How creative the AI should be (0-1)
            max_tokens: 500 // Maximum length of response
        });

        // Return the AI's answer
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to get AI response');
    }
}