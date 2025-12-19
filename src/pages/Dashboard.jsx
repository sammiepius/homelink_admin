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
import UsersChart from '../components/dashboardStats/UserChart';
import PropertiesChart from '../components/dashboardStats/PropertiesChart';
import RecentActivity from '../components/dashboardStats/RecentActivities';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchCharts();
  }, []);
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

  const fetchCharts = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/dashboard/charts',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );

      setChart(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Stats error:', err);
      setLoading(false);
    }
  };

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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
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
        <UsersChart data={chart.users} />

        <PropertiesChart data={chart.properties} />
      </section>

      <RecentActivity
        onOpenProperty={(propertyId) => {
          setSelectedPropertyId(propertyId);
        }}
      />
    </div>
  );
}
