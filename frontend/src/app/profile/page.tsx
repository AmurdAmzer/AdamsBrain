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
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    {/* Account Info */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Email:</span> {user?.email}</p>
                            <p><span className="font-medium">Account Type:</span> Student</p>
                        </div>
                    </div>
                    
                    <hr />
                    
                    {/* Profile Details */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Details</h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Grade Level
                            </label>
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value as 'SHS1' | 'SHS2' | 'SHS3')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="SHS1">SHS1 (Senior Secondary 1)</option>
                                <option value="SHS2">SHS2 (Senior Secondary 2)</option>
                                <option value="SHS3">SHS3 (Senior Secondary 3)</option>
                            </select>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subjects
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={subjects.english}
                                        onChange={(e) => setSubjects({...subjects, english: e.target.checked})}
                                        className="mr-2"
                                    />
                                    English
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={subjects.mathematics}
                                        onChange={(e) => setSubjects({...subjects, mathematics: e.target.checked})}
                                        className="mr-2"
                                    />
                                    Mathematics
                                </label>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}