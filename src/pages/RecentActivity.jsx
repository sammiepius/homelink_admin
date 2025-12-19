import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, PlusCircle, User, Clock } from 'lucide-react';

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'http://localhost:5000/api/admin/recent'
      );
      setActivities(res.data || []);
      console.log(res.data);
    } catch (err) {
      console.error('Failed to fetch activities', err);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    APPROVED_PROPERTY: <CheckCircle className="text-green-600" size={18} />,
    REJECTED_PROPERTY: <XCircle className="text-red-600" size={18} />,
    CREATED_PROPERTY: <PlusCircle className="text-blue-600" size={18} />,
    USER_REGISTERED: <User className="text-purple-600" size={18} />,
  };

  const formatTime = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 1) return 'just now';
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Recent Activities</h2>
        <p className="text-gray-500 text-sm">
          Latest actions happening across HomeLink
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading activities…</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                {iconMap[a.action]}

                <div>
                  <p className="font-medium text-gray-800">
                    <span className="capitalize">
                      {a.actorRole.toLowerCase()}
                    </span>{' '}
                    <span className="font-semibold">{a.actorName}</span>{' '}
                    {a.action.replace('_', ' ').toLowerCase()}
                  </p>

                  <p className="text-sm text-gray-500">
                    {a.entity}: {a.entityTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock size={14} />
                {formatTime(a.createdAt)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
