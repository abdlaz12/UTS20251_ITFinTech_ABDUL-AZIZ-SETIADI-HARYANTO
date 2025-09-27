import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PaymentProcessingPage() {
  const router = useRouter();
  const { external_id, invoice_url } = router.query;
  const [status, setStatus] = useState('PENDING');
  const [countdown, setCountdown] = useState(30); // 30 detik untuk testing
  const [isPolling, setIsPolling] = useState(true);
  const [error, setError] = useState('');

  // Simulasi polling (sementara tanpa backend)
  useEffect(() => {
    if (!external_id || !isPolling) return;

    const simulatePolling = () => {
      console.log('Checking payment status...');
      
      // Simulasi: setelah 10 detik status menjadi PAID
      if (countdown === 20) {
        setStatus('PAID');
        setIsPolling(false);
        
        setTimeout(() => {
          router.push(`/success?order_id=${external_id}`);
        }, 3000);
      }
    };

    const timer = setInterval(() => {
      if (countdown > 0 && status === 'PENDING') {
        setCountdown(prev => prev - 1);
        simulatePolling();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, status, external_id, isPolling, router]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const openXenditWindow = () => {
    if (invoice_url) {
      window.open(invoice_url, 'xendit_payment', 'width=500,height=700,scrollbars=yes');
    } else {
      alert('URL pembayaran tidak tersedia');
    }
  };

  const handleCancel = () => {
    if (confirm('Batalkan pembayaran? Anda akan kembali ke halaman checkout.')) {
      router.push('/checkout');
    }
  };

  // Tampilkan error jika ada
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/checkout')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Kembali ke Checkout
          </button>
        </div>
      </div>
    );
  }

  if (!external_id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Data Pembayaran Tidak Valid</h1>
          <p className="text-gray-600 mb-6">Silakan ulangi proses checkout</p>
          <button 
            onClick={() => router.push('/checkout')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Kembali ke Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Proses Pembayaran - TokoAsik</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              {status === 'PENDING' ? (
                <>
                  <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </>
              ) : (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">✅</span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {status === 'PENDING' ? 'Menunggu Pembayaran' : 'Pembayaran Berhasil!'}
            </h1>
            
            <p className="text-gray-600">
              {status === 'PENDING' 
                ? `Selesaikan pembayaran dalam ${formatTime(countdown)}`
                : 'Sedang mengarahkan ke halaman sukses...'
              }
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Order ID:</span>
              <span className="text-sm font-mono font-semibold">{external_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`text-sm font-semibold ${
                status === 'PENDING' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {status === 'PENDING' ? 'MENUNGGU' : 'BERHASIL'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {status === 'PENDING' && (
            <div className="space-y-3">
              <button
                onClick={openXenditWindow}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 flex items-center justify-center"
              >
                <span className="mr-2">🔗</span>
                Buka Halaman Pembayaran
              </button>
              
              <button
                onClick={handleCancel}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
              >
                Batalkan Pembayaran
              </button>
            </div>
          )}

          {status === 'PAID' && (
            <div className="animate-pulse bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center text-green-600">
                <span className="text-2xl mr-2">🎉</span>
                <span className="font-semibold">Pembayaran Berhasil Diverifikasi!</span>
              </div>
            </div>
          )}

          {/* Progress & Instructions */}
          {status === 'PENDING' && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Waktu tersisa</span>
                <span>{formatTime(countdown)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((30 - countdown) / 30) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tips:</strong> Buka halaman pembayaran dan selesaikan transaksi di Xendit.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}