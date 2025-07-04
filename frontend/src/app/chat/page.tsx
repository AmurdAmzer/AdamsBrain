'use client'    
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {useEffect} from 'react';

export default function ChatPage() {
    const { user, loading } = useAuth();
    const router = useRouter()

    //Define how the message should look like
    type Message = {
        id: string
        text: string
        sender: 'user' | 'ai'
        timestamp: Date
    }

    //State to store messages
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);  
    
    //Redirect to login if user is not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    
    const handleSend = () => {
        if (!inputText.trim()) return;
    
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);
    
        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm your AI tutor! I'm waiting to be connected to GPT-4.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return ( 
        <div className='h-screen bg-gray-50 flex flex-col overflow-hidden'>
            {/* We&apos;ll add header here */}
            {/* Header */}
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
            
            
            {/* We'll add messages area here */}
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
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
            
            {/* We&apos;ll add input area here */} 
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
    )
}