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
        <div> Chat Page </div>
    )
}