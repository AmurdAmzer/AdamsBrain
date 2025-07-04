'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<'English' | 'Mathematics' | null>(null)


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
              onClick={() => router.push('/chat')}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Ask a Question
            </button>
          </div>
        </div>

        {/* Modal component*/}
        {showSubjectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Choose a Subject</h2>
                    <div className="space-y-2">
                        <button 
                            onClick={() => {
                                setSelectedSubject('English')
                                router.push('/chat')
                            }}
                            className="w-full p-4 border rounded hover:bg-gray-50"
                        >
                            English
                        </button>
                        <button 
                            onClick={() => {
                                setSelectedSubject('Mathematics')
                                router.push('/chat')
                            }}
                            className="w-full p-4 border rounded hover:bg-gray-50"
                        >
                            Mathematics
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </AppLayout>
  )
}