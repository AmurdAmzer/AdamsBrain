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
    
    return ( 
        <div className='min--h-screen bg-gray-50 flex flex-col'>
            {/* We@apos;ll add header here */}
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
            
            
            {/* We@apos;ll add messages area here */}
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p>👋 Hi! I'm Adams.</p>
                            <p>Ask me anything about English or Mathematics!</p>
                        </div>
                    ) : (
                        <div>Messages will appear here</div>
                    )}
                </div>
            </div>
            
            {/* We@apos;ll add input area here */} 


        </div>
    )
}