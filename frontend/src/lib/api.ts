const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  baseURL: API_URL,
  
  // Add your API calls here
  test: {
    get: () => fetch(`${API_URL}/api/test`).then(res => res.json()),
    health: () => fetch(`${API_URL}/api/health`).then(res => res.json()),
  }
};