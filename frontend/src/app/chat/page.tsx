'use client'    
import { useState } from 'react'
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
                text: "I'm your AI tutor! In Week 3, I'll be connected to GPT-4.",
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
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <p>👋 Hi! I&apos;m Adams.</p>
                                <p>Ask me anything about English or Mathematics!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
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
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                                    <p className="text-gray-500">Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Input Area */}
                <div className="bg-white border-t px-4 py-4">
                    <div className="max-w-4xl mx-auto flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}