import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Head from 'next/head';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="card text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-6">Silakan tambahkan produk terlebih dahulu</p>
          <Link href="/" className="btn-primary inline-block">
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - TokoAsik</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <span>←</span>
              <span>Kembali Belanja</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
            <div className="w-20"></div> {/* Spacer untuk balance */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Items dalam Keranjang</h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Rp{item.price.toLocaleString('id-ID')} x {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          Rp{(item.qty * item.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Informasi Pengiriman</h2>
                <div className="space-y-4">
                  <div>
                    <label className="input-label">Nama Lengkap</label>
                    <input type="text" className="input-field" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div>
                    <label className="input-label">Alamat Email</label>
                    <input type="email" className="input-field" placeholder="email@contoh.com" />
                  </div>
                  <div>
                    <label className="input-label">No. Telepon</label>
                    <input type="tel" className="input-field" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div>
                    <label className="input-label">Alamat Pengiriman</label>
                    <textarea className="input-field h-24" placeholder="Masukkan alamat lengkap pengiriman"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak (10%)</span>
                  <span className="font-semibold">Rp{tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Link href="/payment" className="btn-primary w-full text-center py-3 text-lg">
                Lanjut ke Pembayaran →
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}