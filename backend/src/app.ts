import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import testRoutes from './routes/test'


// Load environment variables from .env file
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (functions that run on every request)
app.use(cors())           // Allow frontend to call backend
app.use(express.json())   // Parse JSON from requests

// Routes
app.use('/api/test', testRoutes)


// Basic health check
app.get('/', (req, res) => {
  res.json({message: 'AdamsBrain API is running'});
});

app.get('/api/health', (req, res) => {
  res.json({status: 'OK', timestamp: new Date()});
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});