'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '', phone: '' });
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/webhooks/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          items: cart,
        }),
      });

      const data = await res.json();
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        alert('Gagal membuat invoice.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan pada pembayaran.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => window.location.href = '/user/cart'}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
            {['name', 'email', 'phone'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  value={checkoutData[field]}
                  onChange={(e) => setCheckoutData({ ...checkoutData, [field]: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder={field === 'phone' ? '+62 812 3456 7890' : `Enter your ${field}`}
                  autoComplete={field}
                />
              </div>
            ))}
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-bold"
            >
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-gray-700 mb-2">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-xl">Total:</span>
              <span className="font-bold text-indigo-600 text-2xl">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
