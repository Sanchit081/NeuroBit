// src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = 'supersecureadmintoken123'; // should match your .env ADMIN_TOKEN

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-4">Loading admin dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold">Total Subscribers</h2>
          <p className="text-2xl">{data.subscribers.total}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold">Total Products</h2>
          <p className="text-2xl">{data.products.totalProducts}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold">Total Revenue</h2>
          <p className="text-2xl">₹{data.products.totalRevenue}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Recent Subscribers</h2>
      <ul className="bg-white shadow divide-y divide-gray-200 rounded-lg">
        {data.recentSubscribers.map((sub) => (
          <li key={sub._id} className="p-4">
            <div className="font-medium">{sub.email}</div>
            <div className="text-sm text-gray-500">{sub.name} | {new Date(sub.subscribedAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Recent Products</h2>
      <ul className="bg-white shadow divide-y divide-gray-200 rounded-lg">
        {data.recentProducts.map((prod) => (
          <li key={prod._id} className="p-4">
            <div className="font-medium">{prod.name}</div>
            <div className="text-sm text-gray-500">
              Slug: {prod.slug} | Sales: {prod.sales} | Revenue: ₹{prod.revenue}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;