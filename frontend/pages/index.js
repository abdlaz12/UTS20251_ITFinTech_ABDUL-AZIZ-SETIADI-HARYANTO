import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Head from 'next/head';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, cartItems } = useCart();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Toko Kenyang - Belanja Online Terpercaya</title>
        <meta name="description" content="Belanja online mudah dan aman dengan berbagai produk berkualitas" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-soft sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gradient">Toko Kenyang</h1>
                <p className="text-sm text-gray-600">Belanja mudah, harga pas</p>
              </div>
              
              <Link href="/checkout" className="relative">
                <div className="bg-blue-500 text-white p-3 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300">
                  <span className="text-lg">🛒</span>
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {totalItemsInCart}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Produk Terbaru</h2>
            <p className="text-gray-600">Temukan produk berkualitas dengan harga terbaik</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="card card-hover group">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-48 rounded-xl mb-4 flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={`http://localhost:5000${product.image}`} 
                        alt={product.name}
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-4xl text-blue-500">📦</span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description || 'Produk berkualitas dengan harga terbaik'}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-blue-600">
                      Rp{product.price.toLocaleString('id-ID')}
                    </span>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <span>+</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-gray-600">© 2024 TokoAsik. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}