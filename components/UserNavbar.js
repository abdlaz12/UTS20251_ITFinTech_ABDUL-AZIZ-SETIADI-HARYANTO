'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, LogOut, User } from 'lucide-react';

export default function UserNavbar({ cartCount }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.href = '/admin/login';
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => (window.location.href = '/user/dashboard')}
      >
        PermataCommerce
      </h1>

      <div className="flex items-center gap-6">
        {/* Cart */}
        <button
          onClick={() => (window.location.href = '/user/cart')}
          className="relative flex items-center text-gray-700 hover:text-indigo-600 transition"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => (window.location.href = '/user/profile')}
          className="flex items-center text-gray-700 hover:text-indigo-600 transition"
        >
          <User size={22} />
          <span className="ml-2 hidden sm:inline font-medium">
            {user?.name || 'Profile'}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700 transition"
        >
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
}
