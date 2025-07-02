'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import axios from 'axios'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: 'SS1',
    subjects: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const availableSubjects = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 
    'Biology', 'Geography', 'History', 'Economics'
  ]

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // 1. Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      )
      
      const firebaseUser = userCredential.user

      // 2. Update Firebase profile
      await updateProfile(firebaseUser, {
        displayName: formData.name
      })

      // 3. Create student profile in your database
      await axios.post('http://localhost:5000/api/students/create', {
        firebaseUid: firebaseUser.uid,
        email: formData.email,
        name: formData.name,
        grade: formData.grade,
        subjects: formData.subjects
      })

      setMessage('✅ Account created successfully!')
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        grade: 'SS1',
        subjects: []
      })
      
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🎓 Register for AdamsBrain
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade Level
          </label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData({...formData, grade: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="SS1">SS1 (Senior Secondary 1)</option>
            <option value="SS2">SS2 (Senior Secondary 2)</option>
            <option value="SS3">SS3 (Senior Secondary 3)</option>
          </select>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your WASSCE Subjects
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableSubjects.map(subject => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                  className="rounded"
                />
                <span className="text-sm">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className={`mt-4 p-3 rounded text-center ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default RegisterForm