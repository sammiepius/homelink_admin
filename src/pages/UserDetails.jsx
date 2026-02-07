import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { User, Shield, Activity, Home, Lock } from 'lucide-react';
import dayjs from 'dayjs';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users/${id}`
      );
      setUser(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading user…</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="text-teal-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-gray-100">
              {user.role}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-right">
          <p>Status: {user.isActive ? 'Active' : 'Suspended'}</p>
          <p>Joined: {dayjs(user.createdAt).format('MMM D, YYYY')}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Properties" value={user.properties?.length || 0} />
        <Stat label="Activities" value={user.auditLogs?.length || 0} />
        <Stat
          label="Last Login"
          value={user.lastLogin ? dayjs(user.lastLogin).fromNow() : '—'}
        />
        <Stat label="Role" value={user.role} />
      </div>

      {/* TABS */}
      <div className="bg-white border rounded-xl">
        <div className="flex border-b">
          <Tab
            icon={<User size={16} />}
            active={tab === 'overview'}
            onClick={() => setTab('overview')}>
            Overview
          </Tab>
          <Tab
            icon={<Activity size={16} />}
            active={tab === 'activity'}
            onClick={() => setTab('activity')}>
            Activity
          </Tab>
          {user.role === 'LANDLORD' && (
            <Tab
              icon={<Home size={16} />}
              active={tab === 'properties'}
              onClick={() => setTab('properties')}>
              Properties
            </Tab>
          )}
          <Tab
            icon={<Lock size={16} />}
            active={tab === 'security'}
            onClick={() => setTab('security')}>
            Security
          </Tab>
        </div>

        <div className="p-6">
          {tab === 'overview' && <OverviewTab user={user} />}
          {tab === 'activity' && <ActivityTab logs={user.auditLogs} />}
          {tab === 'properties' && (
            <PropertiesTab properties={user.properties} />
          )}
          {tab === 'security' && <SecurityTab user={user} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

const Stat = ({ label, value }) => (
  <div className="bg-white border rounded-lg p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const Tab = ({ children, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 text-sm border-b-2 ${
      active
        ? 'border-teal-600 text-teal-600'
        : 'border-transparent text-gray-500'
    }`}>
    {icon}
    {children}
  </button>
);

const OverviewTab = ({ user }) => (
  <div className="space-y-2 text-sm">
    <p>
      <strong>Name:</strong> {user.name}
    </p>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Role:</strong> {user.role}
    </p>
    <p>
      <strong>Status:</strong> {user.isActive ? 'Active' : 'Suspended'}
    </p>
  </div>
);

const ActivityTab = ({ logs }) => (
  <div className="space-y-4">
    {logs.length === 0 && <p className="text-gray-500">No activity yet</p>}
    {logs.map((log) => (
      <div key={log.id} className="border-b pb-3">
        <p className="text-sm font-medium">{log.action}</p>
        <p className="text-xs text-gray-500">
          {dayjs(log.createdAt).format('MMM D, YYYY h:mm A')}
        </p>
      </div>
    ))}
  </div>
);

const PropertiesTab = ({ properties }) => (
  <div className="space-y-2">
    {properties.map((p) => (
      <div key={p.id} className="border rounded p-3 flex justify-between">
        <span>{p.title}</span>
        <span className="text-sm text-gray-500">
          {p.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    ))}
  </div>
);

const SecurityTab = ({ user }) => (
  <div className="space-y-4">
    <button className="px-4 py-2 bg-yellow-500 text-white rounded">
      Suspend User
    </button>
    <button className="px-4 py-2 bg-red-600 text-white rounded">
      Force Logout
    </button>
  </div>
);
