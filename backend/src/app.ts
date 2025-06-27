import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import testRoutes from './routes/test'


// Load environment variables from .env file
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection Function 
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...')
    
    const conn = await mongoose.connect(process.env.MONGODB_URI as string)
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database Name: ${conn.connection.name}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1) // Exit if database connection fails
  }
}

// Middleware (functions that run on every request)
app.use(cors())           // Allow frontend to call backend
app.use(express.json())   // Parse JSON from requests

// Routes
app.use('/api/test', testRoutes)


// Basic health check
app.get('/', (req, res) => {
  res.json({
    message: 'AdamsBrain API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK', 
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 🚀 Start Server with Database Connection
const startServer = async () => {
  await connectDB()  // Connect to database first
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

// Start everything (CHANGE THIS)
startServer().catch(console.error)