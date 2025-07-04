'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Navbar() {
    const { user } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    const handleLogout = async () => {
        try {
            await signOut(auth)
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }
    
    // Navigation items
    const navItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Chat', path: '/chat' },
        { label: 'Materials', path: '/materials' },
    ]
    
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <h1 
                            onClick={() => router.push('/dashboard')}
                            className="text-xl font-bold text-gray-900 cursor-pointer hover:text-gray-700"
                        >
                            AdamsBrain
                        </h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={`text-sm font-medium ${
                                    pathname === item.path
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    
                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => router.push('/profile')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            {user?.email}
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    router.push(item.path)
                                    setMobileMenuOpen(false)
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                    pathname === item.path
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                router.push('/profile')
                                setMobileMenuOpen(false)
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            Profile
                        </button>
                        <div className="px-3 py-2 text-sm text-gray-500">
                            {user?.email}
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}