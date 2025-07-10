// This file handles communication between frontend and backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function sendMessage(userId: string, subject: string, message: string) {
  try {
    const response = await fetch(`${API_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        subject,
        message
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.response; // The AI's response
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
}