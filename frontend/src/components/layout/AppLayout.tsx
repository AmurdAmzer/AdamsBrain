'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from './Navbar'

type Props = {
    children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
    const { user, loading } = useAuth()
    const router = useRouter()
    
    // Protect all pages using this layout
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        )
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {children}
        </div>
    )
}