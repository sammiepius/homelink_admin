import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const roleBadge = (role) => {
    const map = {
      ADMIN: 'bg-purple-100 text-purple-700',
      LANDLORD: 'bg-blue-100 text-blue-700',
      TENANT: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${map[role]}`}>
        {role}
      </span>
    );
  };

  const statusBadge = (active) =>
    active ? (
      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
        Suspended
      </span>
    );

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>

      {loading ? (
        <div className="p-4 text-gray-500">Loading users…</div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-medium">Name</th>
              <th className="p-4 text-sm font-medium">Email</th>
              <th className="p-4 text-sm font-medium">Role</th>
              <th className="p-4 text-sm font-medium">Created</th>
              {/* <th className="p-4 text-sm font-medium">Status</th> */}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td
                  className="p-4 font-medium"
                  onClick={() => navigate(`/user/${u.id}`)}>
                  {u.name}
                </td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4">{roleBadge(u.role)}</td>
                <td className="p-4 text-gray-500">
                  {dayjs(u.createdAt).format('MMM D, YYYY')}
                </td>
                {/* <td className="p-4">{statusBadge(u.isActive)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
