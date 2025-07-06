'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'

export default function ProfilePage() {
    const { user } = useAuth()
    
    // State for profile form
    const [displayName, setDisplayName] = useState('')
    const [grade, setGrade] = useState<'SHS1' | 'SHS2' | 'SHS3'>('SHS1')
    const [subjects, setSubjects] = useState({
        english: true,
        mathematics: true
    })
    const [isSaving, setIsSaving] = useState(false)
    
    // Load user data
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '')
        }
    }, [user])
    
    const handleSave = async () => {
        setIsSaving(true)
        // Week 3: Save to database
        setTimeout(() => {
            setIsSaving(false)
            alert('Profile updated! (Not really - will work on saving it to the database)')
        }, 1000)
    }
    
    return (
        <AppLayout>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                  {displayName ? displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">{displayName || 'Student'}</h1>
                  <p className="text-blue-100">{user?.email}</p>
                </div>
              </div>
            </div>
      
            {/* Profile Content */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Sessions</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Study Streak</span>
                      <span className="font-semibold text-green-600">3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold">Nov 2024</span>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* Profile Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  
                  {/* Form Fields with better styling */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade Level
                      </label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value as 'SHS1' | 'SHS2' | 'SHS3')}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="SS1">SS1 (Senior Secondary 1)</option>
                        <option value="SS2">SS2 (Senior Secondary 2)</option>
                        <option value="SS3">SS3 (Senior Secondary 3)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Subjects
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all cursor-pointer">
                          <input
                            type="checkbox"
                            checked={subjects.english}
                            onChange={(e) => setSubjects({...subjects, english: e.target.checked})}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
                          />
                          <span className="font-medium">English Language</span>
                        </label>
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all cursor-pointer">
                          <input
                            type="checkbox"
                            checked={subjects.mathematics}
                            onChange={(e) => setSubjects({...subjects, mathematics: e.target.checked})}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
                          />
                          <span className="font-medium">Core Mathematics</span>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </AppLayout>
      )
}