'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
    // If user exists, redirect to dashboard (we'll create this later)
    else if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">AdamsBrain</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}