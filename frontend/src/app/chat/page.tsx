'use client'    
import { useState } from 'react'
import { useEffect } from 'react'
import AppLayout from '@/components/layout/AppLayout'

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
    
    useEffect(() => {
        const savedSubject = localStorage.getItem('selectedSubject') as 'English' | 'Mathematics'
        if (savedSubject) {
            setCurrentSubject(savedSubject)
        }
    }, [])

    const handleSend = () => {
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
    
        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm your AI tutor! I'm waiting to be connected to GPT-4.",
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
            setIsLoading(false)
        }, 1000)
    }

    return (
        <AppLayout>
            <div className='h-[calc(100vh-4rem)] flex flex-col'>
                {messages.length === 0 ? (
                    // Centered layout when no messages
                    <div className="flex-1 flex flex-col items-center justify-center px-4">
                        <div className="w-full max-w-2xl -mt-32">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                                    Chat with Adams
                                </h1>
                                <p className="text-gray-600">
                                    Ask me anything about {currentSubject}!
                                </p>
                            </div>
                            
                            {/* Centered input with button inside */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question..."
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors ${
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
                ) : (
                    // Regular chat layout when messages exist
                    <>
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
                            <div className="max-w-3xl mx-auto space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-2xl px-4 py-2 rounded-lg ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-gray-200'
                                            }`}
                                        >
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                                            <p className="text-gray-500">Thinking...</p>
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