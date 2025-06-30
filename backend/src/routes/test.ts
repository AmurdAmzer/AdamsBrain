// This file handles all "/api/test" routes
import { Router, Request, Response } from 'express'
import Student from '../models/Student' // Import the Student model

const router = Router()


router.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

router.post('/', (req: Request, res: Response) => {
  const { message } = req.body
  
  res.json({
    received: message,
    response: `Backend received: ${message}`,
    timestamp: new Date().toISOString()
  })
})

// Test database connection
router.get('/database', async (req: Request, res: Response) => {
  try {
    // Count how many students are in the database
    const studentCount = await Student.countDocuments()  

    res.json({
      message: 'Database connection successful!',  
      studentCount: studentCount,  
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Database connection error:', error)
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Create a test student
router.post('/create-student', async (req: Request, res: Response) => {  // ← Changed endpoint name
  try {
    const testStudent = new Student({  
      firebaseUid: 'test-uid-' + Date.now(),
      email: 'student' + Date.now() + '@adamsbrain.com',
      name: 'Test Student',
      grade: 'SS2',
      subjects: ['Mathematics', 'English'],
      preferences: {
        difficulty: 'medium',
        studyTime: 45,
        notifications: true
      }
    })

    const savedStudent = await testStudent.save()  
    
    res.json({
      message: 'Test student created successfully!',
      student: savedStudent,  
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create student',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Get all students in the database
router.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await Student.find()  

    res.json({
      message: 'Students retrieved successfully!',
      count: students.length,
      students: students,  
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to get students',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Temporary GET route for testing post requests
router.get('/create-student-get', async (req: Request, res: Response) => {
  try {
    const testStudent = new Student({
      firebaseUid: 'test-uid-' + Date.now(),
      email: 'student' + Date.now() + '@adamsbrain.com',
      name: 'Test Student',
      grade: 'SS2',
      subjects: ['Mathematics', 'English'],
      preferences: {
        difficulty: 'medium',
        studyTime: 45,
        notifications: true
      }
    })

    const savedStudent = await testStudent.save()
    
    res.json({
      message: 'Test student created successfully!',
      student: savedStudent,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create student',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

export default router