// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(res.data);
        console.log(stats)
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // const fetchDashboardStats = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/admin/dashboard");
  //     setStats(res.data);
  //   } catch (err) {
  //     console.error("Dashboard fetch failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDashboardStats();
  // }, []);

  const stat = [
    { title: 'Total Properties', value: 128 },
    { title: 'Total Users', value: 540 },
    { title: 'Landlords', value: 76 },
    { title: 'Active Listings', value: 98 },
  ];

  const data = [
    { month: 'Jan', users: 200, properties: 20 },
    { month: 'Feb', users: 240, properties: 25 },
    { month: 'Mar', users: 300, properties: 30 },
    { month: 'Apr', users: 350, properties: 28 },
    { month: 'May', users: 400, properties: 35 },
  ];

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stat.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
            <span className="text-gray-500 text-md">{s.title}</span>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </section>
      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-700 font-semibold mb-3">
            Monthly New Users
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#0d9488"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-700 font-semibold mb-3">
            Properties Growth
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="properties" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      {/* Recent Activity */}
      <section className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">John Doe</td>
              <td>Added a new property</td>
              <td>Today</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Sarah Lee</td>
              <td>Signed up</td>
              <td>Yesterday</td>
            </tr>
            <tr>
              <td className="py-2">Michael</td>
              <td>Requested approval</td>
              <td>2 days ago</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
