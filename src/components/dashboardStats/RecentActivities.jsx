import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropertyPreviewModal from '../PropertyPreviewModal';

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
  const [filter, setFilter] = useState('ALL');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

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

  const openPropertyPreview = async (id) => {
    if (!id) {
      console.warn('No property ID provided');
      return;
    }

    try {
      setPreviewLoading(true);
      setPreviewOpen(true);

      const res = await axios.get(
        `http://localhost:5000/api/admin/property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );

      setSelectedProperty(res.data.property);
    } catch (err) {
      console.error('Failed to load property', err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const filteredActivities = activities.filter((log) => {
    if (filter === 'ALL') return true;

    if (filter === 'APPROVAL') return log.action.includes('APPROVE');

    if (filter === 'DELETE') return log.action.includes('DELETE');

    if (filter === 'REJECT') return log.action.includes('REJECT');

    if (filter === 'CREATE') return log.action.includes('CREATE');

    return true;
  });

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border">
      <h6 className="font-semibold mb-4">Recent Activity</h6>
      <div className="flex gap-2 mb-4">
        {[
          { label: 'All', value: 'ALL' },
          { label: 'Approvals', value: 'APPROVAL' },
          { label: 'Deletes', value: 'DELETE' },
          { label: 'Rejects', value: 'REJECT' },
          { label: 'Create', value: 'CREATE' },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition
        ${
          filter === item.value
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
        }`}>
            {item.label}
          </button>
        ))}
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2">User</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="py-4 text-gray-400">
                Loading activity….
              </td>
            </tr>
          ) : filteredActivities.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-4 text-gray-400">
                No activity found for this filter
              </td>
            </tr>
          ) : (
            filteredActivities.map((log) => (
              // <tr
              //   key={log.id}
              //   className="border-b hover:bg-gray-50 cursor-pointer"
              //   title="Click to preview property"
              //   // onClick={() =>
              //   //   log.entity?.toUpperCase() === 'PROPERTY' &&
              //   //   openPropertyPreview(log.entityId)
              //   // }
              //   onClick={() => {
              //     if (!log.entityId) return;
              //     if (log.entity?.toUpperCase() !== 'PROPERTY') return;

              //     openPropertyPreview(log.entityId);
              //   }}

              //   // onClick={() => {
              //   //   console.log('CLICKED LOG:', log);
              //   //   openPropertyPreview(log.entityId);
              //   // }}
              // >
              <tr
                key={log.id}
                onClick={() => {
                  if (
                    log.entity?.toUpperCase() === 'PROPERTY' &&
                    log.entityId
                  ) {
                    openPropertyPreview(log.entityId);
                  }
                }}
                title="Click to preview property"
                className={`border-b hover:bg-gray-50 ${
                  log.entity?.toUpperCase() === 'PROPERTY'
                    ? 'cursor-pointer'
                    : 'cursor-default opacity-70'
                }`}>
                {/* USER */}
                <td className="py-2">
                  <div className="font-medium">
                    {log.actor?.name || 'System'}
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1
  ${
    log.actorRole === 'ADMIN'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-gray-100 text-gray-600'
  }`}>
                    {log.actorRole}
                  </span>
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
      <PropertyPreviewModal
        open={previewOpen}
        loading={previewLoading}
        property={selectedProperty}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedProperty(null);
        }}
      />
    </section>
  );
}
