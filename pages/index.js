'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      router.push('/admin/login');
    } else if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/user/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <p className="text-gray-600 text-lg">Redirecting...</p>
    </div>
  );
}
