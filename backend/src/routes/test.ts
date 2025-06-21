// This file handles all "/api/test" routes
import { Router, Request, Response } from 'express'

const router = Router()

// GET /api/test
router.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// POST /api/test (for testing data sending)
router.post('/', (req: Request, res: Response) => {
  const { message } = req.body
  
  res.json({
    received: message,
    response: `Backend received: ${message}`,
    timestamp: new Date().toISOString()
  })
})

export default router