import express from 'express';
import { getAIResponse, getAIResponseStream } from '../services/openai';
import { ChatSession } from '../models/ChatSession';
import { User } from '../models/User';
import { UserProgress } from '../models/UserProgress';

const router = express.Router();

// POST /api/chat/message - Send a message and get AI response
router.post('/message', async (req, res) => {
    try {
        const { userId, subject, message } = req.body;
        
        // Get AI response
        const aiResponse = await getAIResponse(subject, message);
        
        // Save to database (To Do: Implement ChatSession model)
        
        res.json({ 
            success: true,
            response: aiResponse 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Failed to get response' 
        });
    }
});

router.post('/message/stream', async (req, res) => {
    try {
        const { userId, subject, message } = req.body;
        
        // Set headers for Server-Sent Events
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        // Get the stream
        const stream = await getAIResponseStream(subject, message);
        
        let fullResponse = '';
        
        // Send each chunk as it arrives
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                fullResponse += content;
                // Send chunk to frontend
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }
        
        // Send done signal
        res.write(`data: [DONE]\n\n`);
        
        // Save complete message to database
        // ... your existing save logic here with fullResponse
        
        res.end();
    } catch (error) {
        console.error('Stream error:', error);
        res.write(`data: ${JSON.stringify({ error: 'Failed to get response' })}\n\n`);
        res.end();
    }
});


export default router;