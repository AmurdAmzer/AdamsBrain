// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAyU-B8n9o2GXHFfJGxDUfhqIsIi7WrEVw",
  authDomain: "adamsbrain.firebaseapp.com",
  projectId: "adamsbrain",
  storageBucket: "adamsbrain.firebasestorage.app",
  messagingSenderId: "402244446317",
  appId: "1:402244446317:web:c6ba86ccdfe45bd2e3b764"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Cloud Storage
export const storage = getStorage(app)

export default app