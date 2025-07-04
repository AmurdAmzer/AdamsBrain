'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<'English' | 'Mathematics' | null>(null)

  const handleSubjectSelect = (subject: 'English' | 'Mathematics') => {
    setSelectedSubject(subject)
    setShowSubjectModal(false)
    // Store in localStorage for persistence
    localStorage.setItem('selectedSubject', subject)
    router.push('/chat')
  }

  return (
    <AppLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Study Stats</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">Questions Asked</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-600">No recent activity</p>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <button 
              onClick={() => setShowSubjectModal(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2">
              Ask a Question
            </button>
            <button 
              onClick={() => router.push('/materials')}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
              Browse Materials
            </button>
          </div>
        </div>
      </main>

      {/* Subject Selection Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Subject</h2>
            <p className="text-gray-600 mb-6">Select which subject you want to study</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleSubjectSelect('English')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-900">English Language</h3>
                <p className="text-sm text-gray-600">Grammar, comprehension, essay writing</p>
              </button>
              
              <button 
                onClick={() => handleSubjectSelect('Mathematics')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-900">Mathematics</h3>
                <p className="text-sm text-gray-600">Algebra, geometry, statistics</p>
              </button>
            </div>
            
            <button 
              onClick={() => setShowSubjectModal(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  )
}