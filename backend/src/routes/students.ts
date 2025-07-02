const express = require('express')
const router = express.Router()

// Import Student model (we'll add this back once the route works)
// import Student from '../models/Student'

// Simple test route first
router.post('/create', (req: any, res: any) => {
  console.log('Student route called!')
  console.log('Request body:', req.body)
  
  res.json({
    message: '✅ Student route is working!',
    received: req.body,
    timestamp: new Date().toISOString()
  })
})

module.exports = router