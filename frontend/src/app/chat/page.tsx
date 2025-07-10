'use client'    
import { useState } from 'react'
import { useEffect } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { sendMessage } from '@/services/api/chat'
import { useAuth } from '@/contexts/AuthContext';

export default function ChatPage() {
    // Message type definition
    type Message = {
        id: string
        text: string
        sender: 'user' | 'ai'
        timestamp: Date
    }

    // State for chat functionality only
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentSubject, setCurrentSubject] = useState<'English' | 'Mathematics'>('English')
    
    const { user } = useAuth();

    useEffect(() => {
        const savedSubject = localStorage.getItem('selectedSubject') as 'English' | 'Mathematics'
        if (savedSubject) {
            setCurrentSubject(savedSubject)
        }
    }, [])

    const handleSend = async () => {
        if (!inputText.trim()) return
    
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        }
        
        setMessages(prev => [...prev, userMessage])
        setInputText('')
        setIsLoading(true)

        try {
            // Get real AI response from your backend
            const aiResponse = await sendMessage(
                user?.uid || 'anonymous',
                currentSubject,  // This will be 'English', 'Mathematics', 'Science', or 'Social Studies' 
                inputText
            );
    
            // Add AI response to chat
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponse,
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            // Show error message if something goes wrong
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <AppLayout>
            <div className='h-[calc(100dvh-4rem)] flex flex-col overflow-hidden'>
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-full max-w-2xl -mt-32 animate-slideIn">
                    {/* Animated Logo/Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-5xl animate-pulse">🧠</span>
                        </div>
                    </div>
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Hi! I&apos;m Adams, your AI tutor
                        </h1>
                        <p className="text-lg text-gray-600">
                        Ready to help you master <span className="font-semibold text-blue-600">{currentSubject}</span>
                        </p>
                    </div>
                    
                    {/* Suggestion Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <button 
                        onClick={() => setInputText("Explain quadratic equations")}
                        className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                        >
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">💡 Try asking:</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {currentSubject === 'Mathematics' ? "Explain quadratic equations" : "What are verb tenses?"}
                        </p>
                        </button>
                        
                        <button 
                        onClick={() => setInputText("Give me practice questions")}
                        className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                        >
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">📝 Practice:</p>
                        <p className="text-sm text-gray-600 mt-1">Give me practice questions</p>
                        </button>
                    </div>
                    
                    {/* Centered input with button inside */}
                    <div className="relative">
                        <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your question..."
                        className="w-full px-6 py-4 pr-14 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
                        autoFocus
                        />
                        <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                            inputText.trim() 
                            ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-md' 
                            : 'text-gray-400 bg-gray-100'
                        } disabled:cursor-not-allowed`}
                        >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                ) : (
                // Chat messages view
                <>
                    {/* Messages Area with better styling */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
                        >
                            <div
                            className={`max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${
                                message.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                : 'bg-white border border-gray-100'
                            }`}
                            >
                            <p className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800'} whitespace-pre-wrap`}>
                                {message.text}
                            </p>
                            </div>
                        </div>
                        ))}
                        {isLoading && (
                        <div className="flex justify-start animate-slideIn">
                            <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-sm">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>      
                        {/* Input Area at bottom - with max width */}
                        <div className="bg-white border-t px-4 py-4">
                            <div className="max-w-3xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Type your question..."
                                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputText.trim() || isLoading}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-colors ${
                                            inputText.trim() 
                                                ? 'text-blue-600 hover:text-blue-700' 
                                                : 'text-blue-200 hover:text-blue-400'
                                        } disabled:text-blue-200 disabled:cursor-not-allowed`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    )
}