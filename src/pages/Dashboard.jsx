// // src/pages/AdminDashboard.jsx
// import { useEffect, useState } from 'react';
// import AdminLayout from '../layouts/AdminLayout';
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
//   HomeModernIcon,
//   CheckBadgeIcon,
//   ClockIcon,
//   UserGroupIcon,
//   UserIcon,
//   ArrowTrendingUpIcon,
// } from '@heroicons/react/24/outline';

// import axios from 'axios';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem('adminToken');

//         const res = await axios.get(
//           'http://localhost:5000/api/admin/adminstats',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setStats(res.data.stats);
//         console.log(res.data);
//       } catch (err) {
//         console.error('Stats error:', err.response?.data || err.message);
//       }
//     };
//     fetchStats();
//   }, []);

//   const stat = [
//     // { label: 'Total Properties', value: stats.totalProperties },
//     {
//       label: 'Total Properties',
//       value: stats.totalProperties,
//       icon: HomeModernIcon,
//       color: 'text-blue-600 bg-blue-50',
//     },
//     { label: 'Active Listings', value: stats.activeListings },
//     { label: 'Total Users', value: stats.totalUsers },
//     { label: 'Pending Approval', value: stats.pendingApprovals },
//   ];

//   const data = [
//     { month: 'Jan', users: 200, properties: 20 },
//     { month: 'Feb', users: 240, properties: 25 },
//     { month: 'Mar', users: 300, properties: 30 },
//     { month: 'Apr', users: 350, properties: 28 },
//     { month: 'May', users: 400, properties: 35 },
//     { month: 'Jun', users: 200, properties: 20 },
//     { month: 'Jul', users: 240, properties: 25 },
//     { month: 'Aug', users: 300, properties: 30 },
//     { month: 'Sep', users: 350, properties: 28 },
//     { month: 'Oct', users: 400, properties: 35 },
//     { month: 'Nov', users: 350, properties: 28 },
//     { month: 'Dec', users: 400, properties: 35 },
//   ];

//   return (
//     <>
//       {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//         {stat.map((s, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
//             <span className="text-gray-500 text-md">{s.label}</span>

//             <p className="text-2xl font-bold mt-1">{s.value ?? 0}</p>
//           </div>
//         ))}
//       </section> */}
//       {JSON.stringify(stats)}

//       {/* Charts */}
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-gray-700 font-semibold mb-3">
//             Monthly New Users
//           </h3>
//           <div style={{ width: '100%', height: 260 }}>
//             <ResponsiveContainer>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke="#0d9488"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-gray-700 font-semibold mb-3">
//             Properties Growth
//           </h3>
//           <div style={{ width: '100%', height: 260 }}>
//             <ResponsiveContainer>
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="properties" fill="#059669" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>
//       {/* Recent Activity */}
//       <section className="bg-white p-6 rounded-xl shadow-sm border">
//         <h2 className="font-semibold mb-4">Recent Activity</h2>
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="text-gray-500 border-b">
//               <th className="py-2">User</th>
//               <th>Action</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2">John Doe</td>
//               <td>Added a new property</td>
//               <td>Today</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">Sarah Lee</td>
//               <td>Signed up</td>
//               <td>Yesterday</td>
//             </tr>
//             <tr>
//               <td className="py-2">Michael</td>
//               <td>Requested approval</td>
//               <td>2 days ago</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </>
//   );
// }
// import { useState } from 'react';
// import DashboardCard from '../components/DashboardCards';

// import {
//   UserGroupIcon,
//   HomeModernIcon,
//   ClipboardDocumentListIcon,
//   BanknotesIcon,
// } from '@heroicons/react/24/outline';

// export default function Dashboard() {
//   const [showApprovalModal, setShowApprovalModal] = useState(false);
//   const [selectedCard, setSelectedCard] = useState('');

//   const handleCardClick = (cardName) => {
//     setSelectedCard(cardName);
//     setShowApprovalModal(true);
//   };

//   const stats = {
//     totalUsers: 122,
//     totalListings: 45,
//     pendingApprovals: 8,
//     revenue: '₦250,000',
//   };

//   return (
//     <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       <DashboardCard
//         title="Total Users"
//         value={stats.totalUsers}
//         Icon={UserGroupIcon}
//         color="blue"
//         onClick={() => handleCardClick('Users')}
//       />

//       <DashboardCard
//         title="Total Listings"
//         value={stats.totalListings}
//         Icon={HomeModernIcon}
//         color="green"
//         onClick={() => handleCardClick('Listings')}
//       />

//       <DashboardCard
//         title="Pending Approvals"
//         value={stats.pendingApprovals}
//         Icon={ClipboardDocumentListIcon}
//         color="amber"
//         onClick={() => handleCardClick('Approvals')}
//       />

//       <DashboardCard
//         title="Revenue"
//         value={stats.revenue}
//         Icon={BanknotesIcon}
//         color="purple"
//         onClick={() => handleCardClick('Revenue')}
//       />

//       {showApprovalModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white rounded-2xl w-96 p-6 shadow-xl">
//             <h2 className="text-xl font-semibold">{selectedCard} — Actions</h2>

//             <p className="text-gray-600 mt-2">
//               Manage review and approval actions for {selectedCard}.
//             </p>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowApprovalModal(false)}
//                 className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300">
//                 Close
//               </button>
//               <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                 Approve
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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

import {
  HomeModernIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
  UserIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(
          'http://localhost:5000/api/admin/adminstats',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data.stats);
        setLoading(false);
      } catch (err) {
        console.error('Stats error:', err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

  const stat = [
    {
      label: 'Total Properties',
      value: stats.totalProperties,
      icon: HomeModernIcon,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Active Listings',
      value: stats.activeListings,
      icon: CheckBadgeIcon,
      color: 'text-green-600 bg-green-50',
    },
    // {
    //   label: "Properties (Last 30 days)",
    //   value: stats.properties30d,
    //   icon: ArrowTrendingUpIcon,
    //   color: "text-purple-600 bg-purple-50",
    // },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: UserGroupIcon,
      color: 'text-orange-600 bg-orange-50',
    },
    // {
    //   label: "Landlords",
    //   value: stats.landlords,
    //   icon: UserIcon,
    //   color: "text-indigo-600 bg-indigo-50",
    // },
    // {
    //   label: "Tenants",
    //   value: stats.tenants,
    //   icon: UserIcon,
    //   color: "text-rose-600 bg-rose-50",
    // },
    {
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: ClockIcon,
      color: 'text-yellow-600 bg-yellow-50',
    },
  ];

  const data = [
    { month: 'Jan', users: 200, properties: 20 },
    { month: 'Feb', users: 240, properties: 25 },
    { month: 'Mar', users: 300, properties: 30 },
    { month: 'Apr', users: 350, properties: 28 },
    { month: 'May', users: 400, properties: 35 },
    { month: 'Jun', users: 200, properties: 20 },
    { month: 'Jul', users: 240, properties: 25 },
    { month: 'Aug', users: 300, properties: 30 },
    { month: 'Sep', users: 350, properties: 28 },
    { month: 'Oct', users: 400, properties: 35 },
    { month: 'Nov', users: 350, properties: 28 },
    { month: 'Dec', users: 400, properties: 35 },
  ];

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stat.map((s, index) => {
          const Icon = s.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-lg  cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl shadow-inner ${s.color}`}>
                  <Icon className="w-7 h-7" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.value ?? 0}</h3>
                </div>
              </div>
            </div>
          );
        })}
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
