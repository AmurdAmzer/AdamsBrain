'use client'    
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
    // Authentication and routing hooks
    const { user, loading } = useAuth();
    const router = useRouter()

    // TypeScript type definition for message structure
    // This ensures every message has these exact properties
    type Message = {
        id: string          // Unique identifier for React keys
        text: string        // The actual message content
        sender: 'user' | 'ai'  // Who sent it (only 2 options)
        timestamp: Date     // When it was sent
    }

    // State management for chat functionality
    const [messages, setMessages] = useState<Message[]>([]); // All chat messages
    const [inputText, setInputText] = useState('');          // Current input field text
    const [isLoading, setIsLoading] = useState(false);       // Shows "thinking" state
    
    // Authentication guard - runs after every render
    // Redirects to login if user is not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]); // Re-run if any of these change

    // Show loading screen while checking authentication
    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    
    // Function to handle sending messages
    const handleSend = () => {
        // Prevent sending empty messages
        if (!inputText.trim()) return;
    
        // Create user message object with current timestamp
        const userMessage: Message = {
            id: Date.now().toString(),  // Simple ID generation
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };
        
        // Add message to state using functional update
        // prev => [...prev, userMessage] creates new array with old messages + new one
        setMessages(prev => [...prev, userMessage]);
        setInputText(''); // Clear input field
        setIsLoading(true); // Show AI thinking indicator
    
        // Simulate AI response with 1 second delay
        // Week 3 will replace this with actual API call
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(), // Ensure unique ID
                text: "I'm your AI tutor! In Week 3, I'll be connected to GPT-4.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false); // Hide thinking indicator
        }, 1000); // 1000ms = 1 second delay
    };

    return ( 
        <div className='h-[100dvh] bg-gray-50 flex flex-col overflow-hidden'>
            {/* Header section */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">Chat with Adams</h1>
                </div>
            </header>
            
            {/* Scrollable messages area - takes remaining space */}
            <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Conditional rendering: show welcome or messages */}
                    {messages.length === 0 ? (
                        // Welcome message when no chat history
                        <div className="text-center text-gray-500 mt-8">
                            <p>👋 Hi! I&apos;m Adams.</p>
                            <p>Ask me anything about English or Mathematics!</p>
                        </div>
                    ) : (
                        // Map through messages and render each one
                        messages.map((message) => (
                            <div
                                key={message.id} // React needs unique keys for lists
                                // Dynamic classes based on sender
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    // Different styles for user vs AI messages
                                    className={`max-w-2xl px-4 py-2 rounded-lg ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white'      // User: blue background
                                            : 'bg-white border border-gray-200' // AI: white with border
                                    }`}
                                >
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {/* Show thinking indicator when AI is processing */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                                <p className="text-gray-500">Thinking...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Input area at bottom */}
            <div className="bg-white border-t px-4 py-4">
                <div className="max-w-4xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)} // Update state on typing
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send on Enter
                        placeholder="Type your question..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()} // Disable if input is empty
                        // Disabled state styling with opacity and cursor
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}