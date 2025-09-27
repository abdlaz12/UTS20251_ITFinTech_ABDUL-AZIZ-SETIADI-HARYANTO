import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';

export default function PaymentPage() {
  const { cartItems } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/payments/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          items: cartItems
        })
      });
      
      const data = await response.json();
      
      if (data.invoiceUrl) {
        // Redirect ke halaman processing/pending payment
        router.push({
          pathname: '/payment/processing',
          query: {
            external_id: data.externalId,
            invoice_url: data.invoiceUrl
          }
        });
      } else {
        alert('Gagal membuat invoice pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Terjadi kesalahan saat memulai pembayaran.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pembayaran - TokoKenyang</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/checkout" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <span>←</span>
              <span>Kembali</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Pembayaran</h1>
            <div className="w-20"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 border-2 border-blue-500 rounded-xl bg-blue-50">
                    <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">💳</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Xendit Payment Gateway</h3>
                      <p className="text-sm text-gray-600">Transfer Bank, E-Wallet, Kartu Kredit</p>
                    </div>
                    <div className="badge badge-info">Rekomendasi</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.qty} x Rp{item.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        Rp{(item.qty * item.price).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card sticky top-8 h-fit">
              <h2 className="text-xl font-semibold mb-4">Ringkasan</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak (10%)</span>
                  <span>Rp{tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-30000 ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'btn-primary hover:shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  'Bayar Sekarang'
                )}
              </button>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  🔒 Pembayaran aman dan terenkripsi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}