'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // 🧭 Proteksi halaman admin
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      router.push('/admin/login');
    }
  }, [router, token]);

  // 🔄 Fetch semua produk
  const fetchProducts = async () => {
    try {
    const res = await fetch('/api/products');
    const data = await res.json();

    // Jika response berisi { products: [...] }
    if (Array.isArray(data)) {
      setProducts(data);
    } else if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else if (Array.isArray(data.data)) {
      setProducts(data.data);
    } else {
      setProducts([]);
    }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧩 Upload gambar ke server
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch('/api/products/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.fileUrl; // fileUrl dikirim dari API upload.js
  };

  // ➕ Tambah / Edit Produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = imageFile ? await handleImageUpload() : newProduct.image;

      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `/api/products/${editId}`
        : '/api/products';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newProduct, image: imageUrl }),
      });

      if (res.ok) {
        fetchProducts();
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: '',
        });
        setImageFile(null);
        setEditId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit produk
  const handleEdit = (product) => {
    setEditId(product._id);
    setNewProduct(product);
  };

  // 🗑️ Hapus produk
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Manage Products</h1>
        <button
          onClick={() => router.push('/admin')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Tambah / Edit Produk */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
        </div>

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 rounded w-full mt-4"
        />

        <div className="mt-4">
          <label className="block mb-2 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Daftar Produk */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">Rp {p.price}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
