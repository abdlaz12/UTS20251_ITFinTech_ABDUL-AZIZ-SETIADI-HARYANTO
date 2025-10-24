// pages/payment/failed.js
import { useRouter } from 'next/router';
import { X } from 'lucide-react';

export default function PaymentFailed() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={64} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Failed</h1>
          {order_id && (
            <p className="text-gray-600 mb-2">Order ID: <span className="font-bold">{order_id}</span></p>
          )}
          <p className="text-gray-600 mb-6">
            Unfortunately, your payment could not be processed.
          </p>

          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-red-800">Please try again or contact support if the problem persists.</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.back()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}