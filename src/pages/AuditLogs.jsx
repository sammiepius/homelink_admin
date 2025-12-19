import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import ActionBadge from '../components/ActionBadge';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';




dayjs.extend(relativeTime);

const timeAgo = (date) => dayjs(date).fromNow();

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [page, search, action]);

  const fetchLogs = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/audit-log?page=${page}&search=${search}&action=${action}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );

    setLogs(res.data.logs);
    setTotalPages(res.data.pagination.totalPages);
  };

  //   const timeAgo = (date) => dayjs(date).fromNow();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Audit Logs</h2>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3">
          <Search size={16} />
          <input
            placeholder="Search property title..."
            className="ml-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg px-3"
          onChange={(e) => setAction(e.target.value)}>
          <option value="all">All Actions</option>
          <option value="APPROVE_PROPERTY">Approvals</option>
          <option value="DELETE_PROPERTY">Deletes</option>
          <option value="TOGGLE_PROPERTY_ACTIVE">Activation</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Actor</th>
              <th>Action</th>
              <th>Property</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium">{log.actor?.name}</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    {log.actorRole}
                  </span>
                </td>

                <td>
                  <ActionBadge action={log.action} />
                </td>

                <td className="font-medium">{log.metadata?.title || '—'}</td>

                <td className="text-gray-500">{timeAgo(log.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded">
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  );
}
