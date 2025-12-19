import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Search,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Filter,
  CheckCircle,
  Trash,
  Trash2,
} from 'lucide-react';
import PropertyModal from './PropertyModal';
import { toast } from 'sonner';
import SwitchToggle from '../components/SwitchToggle';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { Button } from 'bootstrap';

export default function ApprovalsPage() {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const [locationFilter, setLocationFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        'http://localhost:5000/api/admin/properties',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProperties(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  // const handleApprove = async (id) => {
  //   try {
  //     await axios.patch(
  //       `http://localhost:5000/api/admin/property/${id}/approve`
  //     );
  //     setSelected((prev) => (prev ? { ...prev, approved: true } : null));
  //     fetchPendingApprovals();
  //     setSelected(null);
  //     toast.success('Property approved successfully');
  //   } catch (error) {
  //     console.error('Approve error:', error);

  //     // Detect backend response
  //     const msg = error?.response?.data?.message;

  //     if (msg === 'This property is already approved.') {
  //       toast.info('Already approved');
  //       return;
  //     }

  //     toast.error('Failed to approve property');
  //   }
  // };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/property/${id}/reject`
      );
      fetchPendingApprovals();
      setSelected(null);
    } catch (error) {
      console.error('Reject error:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/property/${id}/toggle-active`,
        { isActive }
      );

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive } : p))
      );

      setSelected((prev) =>
        prev && prev.id === id ? { ...prev, isActive } : prev
      );
    } catch (err) {
      console.error(err);
    }
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      let A = a[sortField];
      let B = b[sortField];

      if (typeof A === 'string') A = A.toLowerCase();
      if (typeof B === 'string') B = B.toLowerCase();

      if (sortOrder === 'asc') return A > B ? 1 : -1;
      return A < B ? 1 : -1;
    });
  };

  const filterData = (data) => {
    return data
      .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => {
        if (locationFilter === 'all') return true;
        return p.location === locationFilter;
      })
      .filter((p) => {
        if (priceRange === 'all') return true;
        if (priceRange === 'cheap') return p.price < 50000000;
        if (priceRange === 'medium')
          return p.price >= 50000000 && p.price <= 150000000;
        if (priceRange === 'expensive') return p.price > 150000000;
      });
  };

  const sorted = sortData(filterData(properties));

  const paginated = sorted.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(sorted.length / limit);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:5000/api/admin/property/${id}/delete`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  //         },
  //       }
  //     );

  //     toast.success('Property deleted');

  //     setShowDeleteModal(false);
  //     setDeleteId(null);

  //     fetchPendingApprovals();
  //   } catch (err) {
  //     toast.error('Failed to delete property');
  //     console.error('Delete error:', err.response?.data || err.message);
  //   }
  // };
  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/admin/property/${id}/delete`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    console.log(id)

    toast.success("Property deleted");

    setShowDeleteModal(false);
    setDeleteId(null);

    fetchPendingApprovals();
  } catch (err) {
    toast.error("Failed to delete property");
    console.error("Delete error:", err.response?.data || err.message);
  }
};


  return (
    <div className="p-0 mb-10">
      {/* PAGE HEADER */}
      {/* <div className="flex justify-between items-center mb-6">
        <h5 className="text-2xl font-bold">Property Approvals</h5>
      </div> */}

      {/* SEARCH + FILTER TOOLS */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex w-full md:w-80 bg-white shadow-sm border rounded-lg p-2 items-center gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by title..."
            className="flex-1 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Location Filter */}
        <select
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border bg-white shadow-sm rounded-lg p-2">
          <option value="all">All Locations</option>
          {[...new Set(properties.map((p) => p.location))].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          onChange={(e) => setPriceRange(e.target.value)}
          className="border bg-white shadow-sm rounded-lg p-2">
          <option value="all">All Prices</option>
          <option value="cheap">Below ₦50m</option>
          <option value="medium">₦50m - ₦150m</option>
          <option value="expensive">Above ₦150m</option>
        </select>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="animate-pulse text-gray-400">Loading table…</div>
      ) : paginated.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 sticky top-0 shadow">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Image
                </th>

                <th
                  className="p-4 text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => toggleSort('title')}>
                  Title
                  {sortField === 'title' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="inline ml-1" size={14} />
                    ) : (
                      <ChevronDown className="inline ml-1" size={14} />
                    ))}
                </th>

                <th
                  className="p-4 text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => toggleSort('location')}>
                  Location
                  {sortField === 'location' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="inline ml-1" size={14} />
                    ) : (
                      <ChevronDown className="inline ml-1" size={14} />
                    ))}
                </th>

                <th
                  className="p-4 text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => toggleSort('price')}>
                  Price
                  {sortField === 'price' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="inline ml-1" size={14} />
                    ) : (
                      <ChevronDown className="inline ml-1" size={14} />
                    ))}
                </th>

                {/* <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                  Actions
                </th> */}
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                  Status
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                  Active
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                  Delete
                </th>
                {/* <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                  Edit
                </th> */}
              </tr>
            </thead>

            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    {(() => {
                      let imgs = [];

                      try {
                        imgs =
                          typeof p.images === 'string'
                            ? JSON.parse(p.images)
                            : Array.isArray(p.images)
                            ? p.images
                            : [];
                      } catch {
                        imgs = [];
                      }

                      const src = imgs[0] || '/placeholder.jpg';

                      return (
                        <img
                          src={src}
                          alt={p.title}
                          className="w-16 h-16 object-cover rounded border bg-gray-100"
                        />
                      );
                    })()}
                    {/* <img
                      src={JSON.parse(p.images)[0]}
                      className="w-16 h-16 object-cover rounded border"
                    /> */}

                    {/* <img
                      src={imageArray[0] || '/placeholder.jpg'}
                      className="w-16 h-16 object-cover rounded border"
                    /> */}
                  </td>
                  <td
                    onClick={() => navigate(`/property/${p.id}`)}
                    className="p-4 font-medium text-teal-600 cursor-pointer ">
                    {p.title}
                  </td>
                  <td className="p-4 text-gray-600 ">{p.location}</td>
                  <td className="p-4 font-semibold text-teal-600">
                    ₦{p.price.toLocaleString()}
                  </td>

                  {/* ACTIONS */}
                  {/* <td
                    className="p-4 flex gap-3 justify-end"
                    onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleApprove(p.id)}
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                      title="Approve">
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => handleReject(p.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Reject">
                      <X size={16} />
                    </button>
                  </td> */}
                  <td className="p-4 font-medium">
                    {p.approved ? (
                      <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle size={14} /> Approved
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 flex items-center gap-1">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">
                    {' '}
                    {/* {p.isActive ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
                        Inactive
                      </span>
                    )} */}
                    <SwitchToggle
                      checked={p.isActive}
                      onChange={(value) => handleToggleActive(p.id, value)}
                    />
                  </td>
                  <td className="p-4 text-red-400 cursor-pointer">
                    <Trash2
                      onClick={() => {
                        setDeleteId(p.id);
                        setDeleteName(p.title);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                  {/* <td className="p-4 text-gray-600 cursor-pointer">
                    Edit
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 gap-2 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40">
            Prev
          </button>

          <span className="font-medium">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40">
            Next
          </button>
        </div>
      )}

      {/* MODAL */}
      {/* {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onToggleActive={handleToggleActive}
        />
        // <PropertyModal
        //   property={selected}
        //   onClose={() => setModal(false)}
        //   onApprove={handleApprove}
        //   onReject={handleReject}
        //   onToggleActive={handleToggleActive}
        // />
      )} */}
      <DeleteConfirmModal
        open={showDeleteModal}
        itemName={deleteName}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
}
