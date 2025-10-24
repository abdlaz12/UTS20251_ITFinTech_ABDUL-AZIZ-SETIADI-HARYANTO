'use client';

import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Check, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('products');
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Sample products
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 299000, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 1499000, image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 199000, image: '💻' },
    { id: 4, name: 'USB-C Cable', price: 89000, image: '🔌' },
    { id: 5, name: 'Mechanical Keyboard', price: 899000, image: '⌨️' },
    { id: 6, name: 'Wireless Mouse', price: 249000, image: '🖱️' }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    if (checkoutData.name && checkoutData.email && checkoutData.phone) {
      setCurrentPage('payment');
    }
  };

  const processPayment = async () => {
    try {
      setPaymentStatus('processing');

      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getTotalPrice(),
          email: checkoutData.email,
          name: checkoutData.name,
          phone: checkoutData.phone,
          items: cart,
        }),
      });

      const data = await response.json();

      if (response.ok && data.invoice_url) {
        // Arahkan user ke halaman pembayaran Xendit
        window.location.href = data.invoice_url;
      } else {
        console.error('Error creating invoice:', data);
        setPaymentStatus('failed');
        alert('Gagal membuat invoice, silakan coba lagi.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      alert('Terjadi kesalahan saat memproses pembayaran.');
    }
  };

  // Products Page
  const ProductsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
          <button
            onClick={() => setCurrentPage('cart')}
            className="relative bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="text-6xl flex items-center justify-center h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Cart Page
  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentPage('products')}
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
                <div key={item.id} className="flex items-center justify-between border-b last:border-b-0 py-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-indigo-600">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
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
                <span className="text-3xl font-bold text-indigo-600">{formatPrice(getTotalPrice())}</span>
              </div>
              <button
                onClick={() => setCurrentPage('checkout')}
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

const CheckoutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentPage('cart')}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={checkoutData.name}
              onInput={(e) =>
                setCheckoutData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              defaultValue={checkoutData.email}
              onInput={(e) =>
                setCheckoutData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue={checkoutData.phone}
              onInput={(e) =>
                setCheckoutData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={!checkoutData.name || !checkoutData.email || !checkoutData.phone}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition text-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  </div>
);


  // Payment Page
  const PaymentPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentPage('checkout')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Checkout
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Payment</h1>

        {paymentStatus === 'success' ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Thank you for your purchase, {checkoutData.name}!</p>
            <p className="text-gray-500">Redirecting to products...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700"><span className="font-bold">Name:</span> {checkoutData.name}</p>
                <p className="text-gray-700"><span className="font-bold">Email:</span> {checkoutData.email}</p>
                <p className="text-gray-700"><span className="font-bold">Phone:</span> {checkoutData.phone}</p>
              </div>
              <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
                <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                <span className="text-3xl font-bold text-indigo-600">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                <div className="border-2 border-indigo-600 rounded-lg p-4 cursor-pointer hover:bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-indigo-600" />
                    <div>
                      <p className="font-bold text-gray-800">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    <div>
                      <p className="font-bold text-gray-800">Bank Transfer</p>
                      <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                    <div>
                      <p className="font-bold text-gray-800">E-Wallet</p>
                      <p className="text-sm text-gray-600">OVO, GoPay, Dana, LinkAja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={processPayment}
              disabled={paymentStatus === 'processing'}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition text-lg font-bold disabled:bg-gray-400"
            >
              {paymentStatus === 'processing' ? 'Processing Payment...' : 'Pay Now'}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Secured by Xendit Payment Gateway
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'payment' && <PaymentPage />}
    </>
  );
}