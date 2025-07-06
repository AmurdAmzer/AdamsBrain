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
              onClick={() => router.push('/signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="how-it-works" className=" relative py-20 text-center px-4 overflow-hidden text-white" style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 30, 0.85), rgba(0, 0, 20, 0.8)), url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}>
         {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-slideIn">
            <span className="mr-2">🎓</span> Trusted by 1000+ Students
          </div>  
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-white drop-shadow-md animate-slideIn">
            Pass WASSCE with Confidence
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-white drop-shadow-md animate-slideIn" style={{ animationDelay: '0.2s' }}>
            Get 24/7 AI tutoring with Adams. 
            Study offline, track progress, ace your exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => setShowSubjectModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Learning Free
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
            >
              See How It Works
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
              <p className="text-gray-600">Select the subject you would like to study</p>
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

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h3>
            <p className="text-xl text-gray-600">Powerful features designed for WASSCE students</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: '🤖',
                title: '24/7 AI Tutor',
                description: 'Get instant help anytime, anywhere',
                color: 'blue'
              },
              {
                icon: '📚',
                title: 'Past Questions',
                description: 'WASSCE past questions',
                color: 'green'
              },
              {
                icon: '📱',
                title: 'Offline Mode',
                description: 'Study without internet',
                color: 'purple'
              },
              {
                icon: '📈',
                title: 'Progress Tracking',
                description: 'Monitor your improvement',
                color: 'orange'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
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
        {/* Subject Selection Modal (reuse from dashboard) */}
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
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">Student Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "AdamsBrain helped me improve my Math scores from C6 to A1!",
                author: "Sarah, Lagos",
                rating: 5
              },
              {
                quote: "I can study even when there's no internet. It's amazing!",
                author: "John, Accra",
                rating: 4
              },
              {
                quote: "The AI tutor explains better than my teachers sometimes.",
                author: "Mary, Freetown",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">{`"${testimonial.quote}"`}</p>
                
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">- {testimonial.author}</p>
                </div>
              </div>
            ))}
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
              <p className="text-gray-400">amurdamzer@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2025 AdamsBrain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}