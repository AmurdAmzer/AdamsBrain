'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showSubjectModal, setShowSubjectModal] = useState(false)

  // If user is logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubjectSelect = (subject: 'English' | 'Mathematics' | 'Science' | 'Social') => {
    localStorage.setItem('selectedSubject', subject)
    router.push('/signup')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">AdamsBrain</h1>
          <div className="space-x-4">
            <button 
              onClick={() => router.push('/login')}
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pass WASSCE with Confidence
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get 24/7 AI tutoring for English and Mathematics. 
            Study offline, track progress, ace your exams.
          </p>
          <button 
            onClick={() => setShowSubjectModal(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning Free
          </button>
        </div>
      </section>

      {/* 3. How it Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Choose Your Subject</h4>
              <p className="text-gray-600">Select English or Mathematics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Ask Questions</h4>
              <p className="text-gray-600">Chat with Adams, your AI tutor, anytime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Track Progress</h4>
              <p className="text-gray-600">See your improvement over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">24/7 AI Tutor</h4>
              <p className="text-gray-600">Get help anytime, anywhere</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Past Papers</h4>
              <p className="text-gray-600">WASSCE papers 2015-2024</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Offline Mode</h4>
              <p className="text-gray-600">Study without internet</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Progress Tracking</h4>
              <p className="text-gray-600">Monitor your improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Subject Selection CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start?</h3>
          <p className="text-xl text-gray-600 mb-8">Choose your subject and begin learning</p>
          <button 
            onClick={() => setShowSubjectModal(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Student Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
              &quot;AdamsBrain helped me improve my Math scores from C6 to A1!&quot;
              </p>
              <p className="font-semibold">- Sarah, Lagos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
              &quot;I can study even when there&apos;s no internet. It&apos;s amazing!&quot;
              </p>
              <p className="font-semibold">- John, Accra</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
              &quot;The AI tutor explains better than my teachers sometimes.&quot;
              </p>
              <p className="font-semibold">- Mary, Freetown</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">AdamsBrain</h4>
              <p className="text-gray-400">AI-powered WASSCE preparation</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">support@adamsbrain.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 AdamsBrain. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Subject Selection Modal (reuse from dashboard) */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Subject</h2>
            <p className="text-gray-600 mb-6">Select which subject you want to study</p>
            
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
                onClick={() => handleSubjectSelect('Science')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left opacity-50 cursor-not-allowed"
                disabled
              >
                <h3 className="font-semibold text-gray-900">Integrated Science</h3>
                <p className="text-sm text-gray-600">Physics, Chemistry, Biology</p>
                <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
              </button>
              
              <button 
                onClick={() => handleSubjectSelect('Social')}
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
    </div>
  )
}