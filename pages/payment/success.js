// pages/payment/success.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Check } from 'lucide-react';

export default function PaymentSuccess() {
  const router = useRouter();
  const { order_id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order_id) {
      fetchOrderStatus();
    }
  }, [order_id]);

  const fetchOrderStatus = async () => {
    try {
      const response = await fetch(`/api/order/${order_id}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={64} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Payment {order?.paymentStatus === 'paid' ? 'Successful!' : 'Pending'}
          </h1>
          <p className="text-gray-600 mb-2">Order ID: <span className="font-bold">{order?.orderId}</span></p>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase, {order?.customerName}!
          </p>

          {order?.paymentStatus === 'paid' && (
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800 font-semibold">Your payment has been confirmed!</p>
            </div>
          )}

          {order?.paymentStatus === 'pending' && (
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-yellow-800 font-semibold">Your payment is being processed.</p>
              <p className="text-yellow-700 text-sm mt-2">We'll send you a confirmation email once it's confirmed.</p>
            </div>
          )}

          <div className="text-left bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            {order?.items?.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 font-bold text-lg mt-2">
              <span>Total:</span>
              <span>Rp {order?.totalAmount?.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}