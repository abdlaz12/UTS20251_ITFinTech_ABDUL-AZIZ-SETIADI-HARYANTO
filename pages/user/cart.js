'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, newQty) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.location.href = '/user/dashboard'}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              {cart.map(item => (
                <div key={item._id} className="flex items-center justify-between border-b last:border-b-0 py-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {item.image?.includes('/uploads/')
                        ? <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        : '🛍️'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-indigo-600">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 px-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-indigo-600">{formatPrice(total)}</span>
              </div>
              <button
                onClick={() => window.location.href = '/user/checkout'}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition text-lg font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
