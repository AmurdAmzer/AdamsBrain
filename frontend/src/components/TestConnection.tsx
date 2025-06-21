'use client'
import { useState } from 'react'
import axios from 'axios'

const TestConnection = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      // Call your backend API
      const result = await axios.get('http://localhost:5000/api/test')
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (error) {
      setResponse('Error: ' + error.message)
    }
    setLoading(false)
  }

  const sendMessage = async () => {
    setLoading(true)
    try {
      const result = await axios.post('http://localhost:5000/api/test', { 
        message: message 
      })
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (error) {
      setResponse('Error: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Test Backend Connection</h2>
      
      {/* Test GET request */}
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
      >
        {loading ? 'Testing...' : 'Test GET Request'}
      </button>

      {/* Test POST request */}
      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          className="border p-2 w-full rounded mb-2"
        />
        <button 
          onClick={sendMessage}
          disabled={loading || !message}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Send POST Request
        </button>
      </div>

      {/* Response display */}
      {response && (
        <div className="mt-4">
          <h3 className="font-bold">Response:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {response}
          </pre>
        </div>
      )}
    </div>
  )
}

export default TestConnection