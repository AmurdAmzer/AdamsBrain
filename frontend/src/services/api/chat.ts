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

export async function sendMessageStream(
    userId: string, 
    subject: string, 
    message: string,
    onChunk: (chunk: string) => void
) {
  try {
    const response = await fetch(`${API_URL}/api/chat/message/stream`, {
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

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No reader available');

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') return;
                
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.content) {
                        onChunk(parsed.content);
                    }
                } catch (e) {
                    // Ignore JSON parse errors
                }
            }
        }
    }
  } catch (error) {
    console.error('Stream API Error:', error);
    throw error;
  }
}