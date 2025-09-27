import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Head from 'next/head';

export default function SuccessPage() {
  const { clearCart, cartItems } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) || 0;

  return (
    <>
      <Head>
        <title>Pembayaran Berhasil - TokoAsik</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">✓</span>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
          <p className="text-gray-600 mb-6">
            Terima kasih telah berbelanja di Toko Kenyang. Pesanan Anda sedang diproses.
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Pesanan akan dikirim dalam 1-2 hari kerja</p>
          </div>


          {/* Additional Info */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              📞 Butuh bantuan? Hubungi customer service kami di 1500-123
            </p>
          </div>
        </div>
      </div>
    </>
  );
}