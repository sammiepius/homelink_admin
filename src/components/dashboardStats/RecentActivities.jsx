import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock } from 'lucide-react';

dayjs.extend(relativeTime);

const timeAgo = (date) => dayjs(date).fromNow();

// function formatAction(action) {
//   return action
//     .replaceAll('_', ' ')
//     .toLowerCase()
//     .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
// }

function formatDate(date) {
  const d = new Date(date);
  const diff = Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff} days ago`;
}

const actionStyles = (action) => {
  if (action.includes('APPROVE')) return 'bg-green-100 text-green-700';
  if (action.includes('DELETE') || action.includes('REJECT'))
    return 'bg-red-100 text-red-700';
  if (action.includes('ACTIVATE')) return 'bg-blue-100 text-blue-700';
  if (action.includes('DEACTIVATE')) return 'bg-orange-100 text-orange-700';

  return 'bg-gray-100 text-gray-700';
};

const formatAction = (action) =>
  action
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(
          'http://localhost:5000/api/admin/activities/recent',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );

        setActivities(res.data.activities);
      } catch (err) {
        console.error('Failed to load activities', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
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

        {/* <tbody>
          {loading && (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-400">
                Loading activities...
              </td>
            </tr>
          )}

          {!loading && activities.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-400">
                No recent activity
              </td>
            </tr>
          )}

          {activities.map((log) => (
            <tr key={log.id} className="border-b last:border-none">
              <td className="py-2 font-medium">
                {log.actor?.name || 'System'}
              </td>

              <td className="text-gray-700">{formatAction(log.action)}</td>

              <td className="text-gray-500">{formatDate(log.createdAt)}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="py-4 text-gray-400">
                Loading activity…
              </td>
            </tr>
          ) : activities.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-4 text-gray-400">
                No recent activity
              </td>
            </tr>
          ) : (
            activities.map((log) => (
              <tr
                key={log.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  log.entity === 'PROPERTY' && onOpenProperty?.(log.entityId)
                }>
                {/* USER */}
                <td className="py-2">
                  <div className="font-medium">
                    {log.actor?.name || 'System'}
                  </div>
                  <span className="text-xs text-gray-500">{log.actorRole}</span>
                </td>

                {/* ACTION */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${actionStyles(
                      log.action
                    )}`}>
                    {formatAction(log.action)}
                  </span>

                  {log.metadata?.title && (
                    <div className="text-xs text-gray-500 mt-1">
                      {log.metadata.title}
                    </div>
                  )}
                </td>

                {/* DATE */}
                <td className="text-gray-500 text-sm">
                  {/* {formatDate(new Date(log.createdAt), {
                    addSuffix: true,
                  })} */} 
                  <div className="text-xs text-gray-500">
                   
                    {/* {log.metadata.title} */}
                {timeAgo(log.createdAt)}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="text-right mt-3">
        <button
          onClick={() => navigate('/activity/audit')}
          className="text-sm text-blue-600 hover:underline">
          View all activity →
        </button>
      </div>
    </section>
  );
}
