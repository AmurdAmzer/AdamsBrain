'use client'
import { useState } from 'react'
import axios from 'axios'

interface ApiResponse {
  message: string
  timestamp: string
  environment?: string
  received?: string
  response?: string
}

const TestConnection = () => {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const testGetRequest = async (): Promise<void> => {
    setLoading(true)
    try {
      const result = await axios.get<ApiResponse>('http://localhost:5000/api/test')
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (error: any) {
      setResponse('Error: ' + (error.message || 'Unknown error'))
    }
    setLoading(false)
  }

  const testPostRequest = async (): Promise<void> => {
    if (!message) return
    
    setLoading(true)
    try {
      const result = await axios.post<ApiResponse>('http://localhost:5000/api/test', { 
        message: message 
      })
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (error: any) {
      setResponse('Error: ' + (error.message || 'Unknown error'))
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🔗 Test Backend Connection
      </h2>
      
      <button 
        onClick={testGetRequest}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 disabled:opacity-50"
      >
        {loading ? '⏳ Testing...' : '📥 Test GET Request'}
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message to send..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button 
          onClick={testPostRequest}
          disabled={loading || !message}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          📤 Send POST Request
        </button>
      </div>

      {response && (
        <div className="mt-4">
          <h3 className="font-bold text-gray-700 mb-2">📋 Backend Response:</h3>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
            {response}
          </pre>
        </div>
      )}
    </div>
  )
}

export default TestConnection