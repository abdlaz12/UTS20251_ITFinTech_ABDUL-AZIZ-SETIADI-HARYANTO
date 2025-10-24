'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import UserNavbar from '../../components/UserNavbar'; // ✅ import navbar

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/auth/login';
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(savedCart.length);
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);
    alert('✅ Product added to cart!');
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ✅ Navbar selalu tampil di atas */}
      <UserNavbar cartCount={cartCount} />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-600 col-span-3">No products available.</p>
          ) : (
            products.map(product => (
              <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                  {product.image?.includes('/uploads/')
                    ? <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
                    : '🛒'}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
