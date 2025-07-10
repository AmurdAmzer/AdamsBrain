import express from 'express';
import { getAIResponse } from '../services/openai';
import { ChatSession } from '../models/ChatSession';

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

export default router;