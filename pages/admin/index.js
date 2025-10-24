// pages/admin/index.js
'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingBag, Calendar, User } from 'lucide-react';
import { useRouter } from 'next/router';


export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ monthlySales: {}, dailySales: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();
  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  router.push('/admin/login');
};
  const handleGoToProducts = () => {
  router.push('/admin/products');
};



  


    useEffect(() => {
    if (!token) {
        window.location.href = '/admin/login';
    }
    }, [token]);


  // Fetch data orders + stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [ordersRes, statsRes] = await Promise.all([
          fetch('/api/admin/orders', { headers }),
          fetch('/api/admin/stats', { headers }),
        ]);

        if (!ordersRes.ok || !statsRes.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const ordersData = await ordersRes.json();
        const statsData = await statsRes.json();

        setOrders(ordersData.orders);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  // Format data untuk grafik
  const monthlyData = Object.entries(stats.monthlySales).map(([month, total]) => ({
    name: month,
    total,
  }));

  const dailyData = Object.entries(stats.dailySales).map(([date, total]) => ({
    name: date,
    total,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h1>
            <button onClick={handleLogout}className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Logout
            </button>
            <button onClick={handleGoToProducts}className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            Manage Products
            </button>
        {/* Order Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" />
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Total</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Created</th>
                    <th className="py-3 px-4 text-left">Paid At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-indigo-50 transition">
                      <td className="py-3 px-4">{order.orderId}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <User className="text-indigo-600" size={18} /> {order.customerName}
                      </td>
                      <td className="py-3 px-4 font-bold text-indigo-600">
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${
                        order.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : order.paymentStatus === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {order.paymentStatus.toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.paidAt ? new Date(order.paidAt).toLocaleString('id-ID') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" />
              Monthly Revenue
            </h2>
            {monthlyData.length === 0 ? (
              <p className="text-gray-500">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="text-indigo-600" />
              Daily Revenue
            </h2>
            {dailyData.length === 0 ? (
              <p className="text-gray-500">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
