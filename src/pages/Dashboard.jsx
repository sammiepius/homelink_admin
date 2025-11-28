// import { useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import {
//   Bell,
//   Home,
//   Users,
//   Settings,
//   Building2,
//   LogOut,
//   Menu,
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';

// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const stats = [
//     { title: 'Total Properties', value: 128 },
//     { title: 'Total Users', value: 540 },
//     { title: 'Landlords', value: 76 },
//     { title: 'Active Listings', value: 98 },
//     // { title: "Pending Approvals", value: 12 },
//     // { title: "Support Tickets", value: 4 },
//   ];

//   const data = [
//     { month: 'Jan', users: 200, properties: 20 },
//     { month: 'Feb', users: 240, properties: 25 },
//     { month: 'Mar', users: 300, properties: 30 },
//     { month: 'Apr', users: 350, properties: 28 },
//     { month: 'May', users: 400, properties: 35 },
//   ];

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? 'w-64' : 'w-20'
//         } bg-white border-r transition-all duration-300 p-4 fixed h-full shadow-sm`}>
//         {' '}
//         <div className="flex items-center justify-between mb-8">
//           <h1
//             className={`text-sm font-bold text-gray-800 ${
//               sidebarOpen ? 'block' : 'hidden'
//             }`}>
//             HomeLink Admin
//           </h1>
//           <Menu
//             className="cursor-pointer"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           />
//         </div>
//         {/* <Sidebar/> */}
//         <nav className="space-y-4 text-gray-700">
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Home size={20} /> {sidebarOpen && 'Dashboard'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Building2 size={20} /> {sidebarOpen && 'Properties'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Users size={20} /> {sidebarOpen && 'Users'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Settings size={20} /> {sidebarOpen && 'Settings'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer text-red-500 mt-8">
//             <LogOut size={20} /> {sidebarOpen && 'Logout'}
//           </div>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`
//     flex-1
//     p-1
//     transition-all duration-300
//     ${sidebarOpen ? 'ml-64' : 'ml-20'}
//   `}

//   >
//         {/* Header */}
//         <Navbar />
//         {/* </header> */}

//         {/* Stats Cards */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {stats.map((s, i) => (
//             <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
//               <span className="text-gray-500 text-md">{s.title}</span>
//               <p className="text-2xl font-bold mt-1">{s.value}</p>
//             </div>
//           ))}
//         </section>

//         {/* Charts */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <h2 className="font-semibold mb-4">Monthly New Users</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="users" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <h2 className="font-semibold mb-4">Properties Growth</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="properties" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         {/* Recent Activity */}
//         <section className="bg-white p-6 rounded-xl shadow-sm border">
//           <h2 className="font-semibold mb-4">Recent Activity</h2>
//           <table className="w-full text-left text-sm">
//             <thead>
//               <tr className="text-gray-500 border-b">
//                 <th className="py-2">User</th>
//                 <th>Action</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="py-2">John Doe</td>
//                 <td>Added a new property</td>
//                 <td>Today</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="py-2">Sarah Lee</td>
//                 <td>Signed up</td>
//                 <td>Yesterday</td>
//               </tr>
//               <tr>
//                 <td className="py-2">Michael</td>
//                 <td>Requested approval</td>
//                 <td>2 days ago</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </main>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import AdminLayout from '../layouts/AdminLayout'; // adjust path to your layout file
// import axios from 'axios';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
// } from 'recharts';

// // Simple API helper
// const api = axios.create({ baseURL: 'http://localhost:5000' });

// export default function AdminDashboardHome() {
//   const [stats, setStats] = useState(null);
//   const [chartData, setChartData] = useState([]);
//   const [recent, setRecent] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // example endpoint: /api/admin/stats
//         // const res = await api.get('/api/admin/stats', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
//         // setStats(res.data);

//         // Mock data fallback (use real endpoints in production)
//         setStats({ totalUsers: 540, totalProperties: 128, landlords: 76, active: 98, pending: 12 });

//         setChartData([
//           { month: 'Jan', users: 120, properties: 10 },
//           { month: 'Feb', users: 180, properties: 12 },
//           { month: 'Mar', users: 240, properties: 18 },
//           { month: 'Apr', users: 300, properties: 22 },
//           { month: 'May', users: 360, properties: 28 },
//         ]);

//         setRecent([
//           { id: 1, user: 'John Doe', action: 'Added a new property', date: 'Today' },
//           { id: 2, user: 'Sarah Lee', action: 'Signed up', date: 'Yesterday' },
//           { id: 3, user: 'Michael', action: 'Requested approval', date: '2 days ago' },
//         ]);
//       } catch (err) {
//         console.error('Failed to load dashboard data', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <AdminLayout>
//       <div className="max-w-7xl">
//         {/* Header / Welcome */}
//         {/* <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//             <p className="text-sm text-gray-600">Overview of platform activity</p>
//           </div> */}

//           {/* Illustration (mockup preview) - using uploaded asset path */}
//           {/* <img src="/mnt/data/A_2D_digital_image_displays_a_modern_admin_dashboa.png" alt="admin mockup" className="w-28 h-20 object-cover rounded-lg shadow-sm hidden sm:block" />
//         </div> */}

//         {/* Stats */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <StatCard title="Total Users" value={stats?.totalUsers ?? '—'} />
//           <StatCard title="Properties" value={stats?.totalProperties ?? '—'} />
//           <StatCard title="Landlords" value={stats?.landlords ?? '—'} />
//           <StatCard title="Pending Approvals" value={stats?.pending ?? '—'} />
//         </section>

//         {/* Charts */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white p-5 rounded-lg shadow-sm border">
//             <h3 className="text-gray-700 font-semibold mb-3">Monthly New Users</h3>
//             <div style={{ width: '100%', height: 260 }}>
//               <ResponsiveContainer>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="users" stroke="#0d9488" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-lg shadow-sm border">
//             <h3 className="text-gray-700 font-semibold mb-3">Properties Growth</h3>
//             <div style={{ width: '100%', height: 260 }}>
//               <ResponsiveContainer>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="properties" fill="#059669" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </section>

//         {/* Recent activity */}
//         <section className="bg-white p-5 rounded-lg shadow-sm border">
//           <h3 className="text-gray-700 font-semibold mb-4">Recent Activity</h3>

//           {loading ? (
//             <p className="text-gray-500">Loading...</p>
//           ) : (
//             <div className="overflow-auto">
//               <table className="w-full text-left text-sm">
//                 <thead>
//                   <tr className="text-gray-500 border-b">
//                     <th className="py-2">User</th>
//                     <th>Action</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recent.map((r) => (
//                     <tr key={r.id} className="border-b">
//                       <td className="py-2">{r.user}</td>
//                       <td>{r.action}</td>
//                       <td className="text-gray-500">{r.date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </div>
//     </AdminLayout>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );
// }
// src/pages/AdminDashboard.jsx
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

export default function AdminDashboard() {
  const stats = [
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
    <AdminLayout>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
            <span className="text-gray-500 text-md">{s.title}</span>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </section>
      {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats?.totalUsers ?? '—'} />
        <StatCard title="Properties" value={stats?.totalProperties ?? '—'} />
        <StatCard title="Landlords" value={stats?.landlords ?? '—'} />
        <StatCard title="Pending Approvals" value={stats?.pending ?? '—'} />
      </section> */}

      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-4">Monthly New Users</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-4">Properties Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="properties" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section> */}
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
    </AdminLayout>
  );
}
// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );
// }
