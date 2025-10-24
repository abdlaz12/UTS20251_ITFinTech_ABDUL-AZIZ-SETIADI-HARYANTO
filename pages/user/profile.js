'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User, LogOut, ArrowLeft } from 'lucide-react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/user/dashboard');
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <p className="text-gray-600 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => router.push('/user/dashboard')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <User size={48} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mb-6">{user.email}</p>

          <div className="w-full border-t pt-4">
            <p className="text-gray-700">
              <span className="font-bold">Role:</span> {user.role}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Created at:</span>{' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
