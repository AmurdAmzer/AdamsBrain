import mongoose, { Document, Schema } from 'mongoose'

// Define what a Student looks like
export interface IStudent extends Document {
  firebaseUid: string
  email: string
  name: string
  grade: 'SS1' | 'SS2' | 'SS3'
  subjects: string[]
  preferences: {
    difficulty: string
    studyTime: number
    notifications: boolean
  }
  createdAt: Date
  lastActive: Date
}

// Create the database blueprint
const StudentSchema: Schema = new Schema({
  firebaseUid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  grade: { 
    type: String, 
    enum: ['SS1', 'SS2', 'SS3'], 
    required: true 
  },
  subjects: [{ 
    type: String 
  }],
  preferences: {
    difficulty: { 
      type: String, 
      default: 'medium' 
    },
    studyTime: { 
      type: Number, 
      default: 30 
    },
    notifications: { 
      type: Boolean, 
      default: true 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastActive: { 
    type: Date, 
    default: Date.now 
  }
})

export default mongoose.model<IStudent>('Student', StudentSchema)