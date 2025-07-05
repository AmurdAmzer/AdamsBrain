'use client'
import { useState, useEffect } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { useRouter } from 'next/navigation'


export default function Dashboard() {
  const router = useRouter()
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<'English' | 'Mathematics' | 'Science' | 'Social' | null>(null)

  useEffect(() => {
    const savedSubject = localStorage.getItem('selectedSubject') as 'English' | 'Mathematics' | null
    if (savedSubject) {
      setSelectedSubject(savedSubject)
    }
  }, [])

  const handleSubjectSelect = (subject: 'English' | 'Mathematics' | 'Science' | 'Social') => {
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
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Study Stats</h3>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Questions Asked</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-500 text-sm">Start studying to see your activity</p>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <button 
              onClick={() => setShowSubjectModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg mb-3 font-medium"
            >
              Ask a Question
            </button>
            <button 
              onClick={() => router.push('/materials')}
              className="w-full bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Browse Materials
            </button>
          </div>
        </div>

        {selectedSubject && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Current subject: {selectedSubject}
        </div>
      )}
      </main>

      

      {/* Subject Selection Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subject</h2>
            <p className="text-gray-600 mb-8">What would you like to study today?</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleSubjectSelect('Mathematics')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-900">Core Mathematics</h3>
                <p className="text-sm text-gray-600">Set, Functions, Algebra, geometry, Probability, statistics, etc.</p>
              </button>
              
              <button 
                onClick={() => handleSubjectSelect('English')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-900">English Language</h3>
                <p className="text-sm text-gray-600">Grammar, comprehension, essay writing, Summary, etc.</p>
              </button>
              
              <button
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left opacity-50 cursor-not-allowed"
                disabled
              >
                <h3 className="font-semibold text-gray-900">Integrated Science</h3>
                <p className="text-sm text-gray-600">Physics, Chemistry, Biology</p>
                <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
              </button>
              
              <button 
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left opacity-50 cursor-not-allowed"
                disabled
              >
                <h3 className="font-semibold text-gray-900">Social Studies</h3>
                <p className="text-sm text-gray-600">History, Geography, Government</p>
                <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
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