'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useState } from 'react'

export default function Navbar() {
    const { user } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false);
    
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
                
                {/* Logo */}
                <div className="flex items-center">
                    <h1 
                    onClick={() => router.push('/dashboard')}
                    className="text-xl font-bold text-gray-900 cursor-pointer hover:text-gray-700"
                    >
                    AdamsBrain
                    </h1>
                </div>

                {/* Desktop Nav */}
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

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="text-gray-600 hover:text-gray-900 text-xl"
                    >
                    ☰
                    </button>
                </div>

                {/* User Menu (always visible) */}
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
                </div>

                {/* Mobile Nav Menu */}
                {mobileOpen && (
                <div className="md:hidden mt-2 flex flex-col gap-2">
                    {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => {
                        router.push(item.path)
                        setMobileOpen(false)
                        }}
                        className={`text-sm text-left py-2 px-4 rounded hover:bg-gray-100 ${
                        pathname === item.path ? 'text-blue-600' : 'text-gray-800'
                        }`}
                    >
                        {item.label}
                    </button>
                    ))}

                    {/* Mobile Logout Button */}
                    <button 
                    onClick={handleLogout}
                    className="text-sm text-left py-2 px-4 text-red-500 hover:bg-red-50"
                    >
                    Logout
                    </button>
                </div>
                )}
            </div>
            </header>

    )
}