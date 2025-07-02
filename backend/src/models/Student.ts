import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
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
    required: true 
  },
  subjects: [String],
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

const Student = mongoose.model('Student', StudentSchema)

export default Student