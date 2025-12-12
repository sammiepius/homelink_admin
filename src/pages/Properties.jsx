// import { useEffect, useState } from 'react';
// import {
//   CheckCircleIcon,
//   XCircleIcon,
//   EyeIcon,
// } from '@heroicons/react/24/outline';
// import axios from 'axios';

// export default function PropertyApprovalPage() {
//   const [properties, setProperties] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Fetch all properties
//   // const fetchProperties = async () => {
//   //   const res = await fetch('http://localhost:5000/api/admin/properties');
//   //   const data = await res.json();
//   //   setProperties(data);
//   //   console.log(data)
//   // };

//   // useEffect(() => {
//   //   fetchProperties();
//   // }, []);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('adminToken');
//         const res = await axios.get(
//           'http://localhost:5000/api/admin/properties',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProperties(res.data);
//         console.log(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Properties error:', err.response?.data || err.message);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const approveProperty = async (id) => {
//     await fetch(`/api/admin/property/${id}/approve`, {
//       method: 'PATCH',
//     });

//     fetchProperties();
//     setModalOpen(false);
//   };

//   const toggleActive = async (id) => {
//     await fetch(`/api/admin/property/${id}/toggle-active`, {
//       method: 'PATCH',
//     });

//     fetchProperties();
//   };

//   return (
//     <div className="p-6">
//       {/* <h1 className="text-2xl font-bold mb-6">Property Approvals</h1> */}

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left font-semibold">Title</th>
//               <th className="p-3 text-left font-semibold">Location</th>
//               <th className="p-3 text-left font-semibold">Approved</th>
//               <th className="p-3 text-left font-semibold">Active</th>
//               <th className="p-3 text-left font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {properties.map((p) => (
//               <tr key={p.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-3">{p.title}</td>
//                 <td className="p-3">{p.location}</td>
//                 <td className="p-3">
//                   {p.approved ? (
//                     <span className="text-green-600 font-semibold">
//                       Approved
//                     </span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Pending</span>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   {p.isActive ? (
//                     <span className="text-green-600 font-semibold">Active</span>
//                   ) : (
//                     <span className="text-gray-500 font-semibold">
//                       Inactive
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-3 flex gap-3">
//                   {/* Approve button */}
//                   {!p.approved && (
//                     <button
//                       onClick={() => {
//                         setSelected(p);
//                         setModalOpen(true);
//                       }}
//                       className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
//                       Approve
//                     </button>
//                   )}

//                   {/* Toggle Active */}
//                   <button
//                     onClick={() => toggleActive(p.id)}
//                     className={`px-3 py-1 rounded-lg text-white ${
//                       p.isActive
//                         ? 'bg-red-500 hover:bg-red-600'
//                         : 'bg-green-500 hover:bg-green-600'
//                     }`}>
//                     {p.isActive ? 'Deactivate' : 'Activate'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {modalOpen && selected && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg text-center">
//             <h2 className="text-lg font-bold mb-3">Approve this property?</h2>
//             <p className="text-sm text-gray-600 mb-6">{selected.title}</p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                 Cancel
//               </button>

//               <button
//                 onClick={() => approveProperty(selected.id)}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                 Approve
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Bed, Bath, MapPin, User, Search, Check, X } from 'lucide-react';
// import PropertyModal from '../pages/PropertyModal';

// export default function ApprovalsPage() {
//   const [properties, setProperties] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPendingApprovals();
//   }, []);

//   // const fetchPendingApprovals = async () => {
//   //   setLoading(true);
//   //   const res = await axios.get(`http://localhost:5000/api/admin/properties`);
//   //   setProperties(res.data);
//   //   console.log(res.data)
//   //   setLoading(false);
//   // };

//   const fetchPendingApprovals = async () => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       const res = await axios.get(
//         'http://localhost:5000/api/admin/properties',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProperties(res.data);
//       console.log(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Properties error:', err.response?.data || err.message);
//     }
//   };

//   const openModal = (property) => setSelected(property);
//   const closeModal = () => setSelected(null);

//   const handleApprove = async (id) => {
//     await axios.patch(`http://localhost:5000/api/admin/property/${id}/approve`);
//     closeModal();
//     fetchPendingApprovals();
//   };

//   const handleReject = async (id) => {
//     await axios.patch(`http://localhost:5000/api/admin/properties/reject/${id}`);
//     closeModal();
//     fetchPendingApprovals();
//   };

//   const filtered = properties.filter((p) =>
//     p.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Pending Property Approvals</h1>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="flex mb-6 w-full max-w-lg bg-white shadow-sm border rounded-lg p-2 items-center gap-2">
//         <Search size={18} className="text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search properties..."
//           className="flex-1 outline-none"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* LOADING SKELETON */}
//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div
//               key={i}
//               className="animate-pulse bg-gray-100 rounded-xl h-64"></div>
//           ))}
//         </div>
//       ) : filtered.length === 0 ? (
//         <p className="text-gray-500 mt-4">No pending approvals.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filtered.map((p) => (
//             <motion.div
//               key={p.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden border cursor-pointer hover:shadow-lg transition"
//               onClick={() => openModal(p)}>
//               {/* IMAGE */}
//               <div className="h-40 bg-gray-200 overflow-hidden">
//                 {p.images ? (
//                   <img
//                     src={JSON.parse(p.images)[0]}
//                     alt="property"
//                     className="w-full h-full object-cover hover:scale-105 transition"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-400">
//                     No Image
//                   </div>
//                 )}
//               </div>

//               {/* CONTENT */}
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold">{p.title}</h2>

//                 <div className="flex items-center text-gray-500 mt-1">
//                   <MapPin size={16} className="mr-1" />
//                   <p>{p.location}</p>
//                 </div>

//                 {/* META */}
//                 <div className="flex justify-between mt-4 text-gray-600">
//                   <span className="flex items-center gap-1">
//                     <Bed size={16} /> {p.bedrooms}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Bath size={16} /> {p.bathrooms}
//                   </span>
//                   <span className="font-medium text-teal-600">
//                     ₦{p.price.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="mt-4">
//                   <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md">
//                     Pending Approval
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       {selected && (
//         <PropertyModal
//           property={selected}
//           onClose={closeModal}
//           onApprove={handleApprove}
//           onReject={handleReject}
//         />
//       )}
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ApprovalsPage() {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     fetchPendingApprovals();
//   }, []);

//   const fetchPendingApprovals = async () => {
//     const res = await axios.get("/api/admin/properties/pending");
//     setProperties(res.data.properties);
//   };

//   const handleApprove = async (id) => {
//     await axios.put(`/api/admin/properties/approve/${id}`);
//     fetchPendingApprovals();
//   };

//   const handleReject = async (id) => {
//     await axios.put(`/api/admin/properties/reject/${id}`);
//     fetchPendingApprovals();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold">Pending Property Approvals</h1>

//       {properties.length === 0 ? (
//         <p className="text-gray-500 mt-4">No pending approvals.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
//           {properties.map((p) => (
//             <div key={p.id} className="bg-white p-4 rounded-lg shadow-md border">
//               <h2 className="text-lg font-semibold">{p.title}</h2>
//               <p className="text-gray-600 text-sm">{p.location}</p>

//               <p className="mt-2 text-sm text-gray-500">
//                 ₦{p.price.toLocaleString()}
//               </p>

//               <div className="flex justify-between mt-4">
//                 <button
//                   className="px-3 py-2 bg-green-600 text-white rounded-md"
//                   onClick={() => handleApprove(p.id)}
//                 >
//                   Approve
//                 </button>

//                 <button
//                   className="px-3 py-2 bg-red-500 text-white rounded-md"
//                   onClick={() => handleReject(p.id)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Search, Check, X } from 'lucide-react';
// import PropertyModal from '../pages/PropertyModal';

// export default function ApprovalsPage() {
//   const [properties, setProperties] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPendingApprovals();
//   }, []);

//   const fetchPendingApprovals = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('adminToken');

//       const res = await axios.get(
//         'http://localhost:5000/api/admin/properties',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setProperties(res.data || []);
//       setLoading(false);
//     } catch (err) {
//       console.error('Properties error:', err.response?.data || err.message);
//       setLoading(false);
//     }
//   };

//   const openModal = (property) => setSelected(property);
//   const closeModal = () => setSelected(null);

//   const handleApprove = async (id) => {
//     await axios.patch(`http://localhost:5000/api/admin/property/${id}/approve`);
//     closeModal();
//     fetchPendingApprovals();
//   };

//   const handleReject = async (id) => {
//     await axios.patch(
//       `http://localhost:5000/api/admin/properties/reject/${id}`
//     );
//     closeModal();
//     fetchPendingApprovals();
//   };

//   const filtered = properties.filter((p) =>
//     p.title?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         {/* <h1 className="text-2xl font-semibold">Pending Property Approvals</h1> */}
//       </div>

//       {/* Search */}
//       <div className="flex mb-6 w-full max-w-lg bg-white shadow-sm border rounded-lg p-2 items-center gap-2">
//         <Search size={18} className="text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search properties..."
//           className="flex-1 outline-none"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Loading skeleton */}
//       {loading ? (
//         <div className="animate-pulse text-gray-400">Loading table…</div>
//       ) : filtered.length === 0 ? (
//         <p className="text-gray-500 mt-4">No pending approvals.</p>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white shadow-sm border rounded-xl overflow-hidden">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-100 border-b">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-gray-600">
//                   Image
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-gray-600">
//                   Title
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-gray-600">
//                   Location
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-gray-600">
//                   Price
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-gray-600">
//                   Status
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-gray-600 text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="border-b hover:bg-gray-50 transition cursor-pointer"
//                   onClick={() => openModal(p)}>
//                   {/* Thumbnail */}
//                   <td className="p-4">
//                     {p.images ? (
//                       <img
//                         src={JSON.parse(p.images)[0]}
//                         alt="Property"
//                         className="w-16 h-16 rounded object-cover border"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400 rounded">
//                         No Image
//                       </div>
//                     )}
//                   </td>

//                   {/* Title */}
//                   <td className="p-4 font-medium">{p.title}</td>

//                   {/* Location */}
//                   <td className="p-4 text-gray-600">{p.location}</td>

//                   {/* Price */}
//                   <td className="p-4 text-teal-600 font-semibold">
//                     ₦{p.price.toLocaleString()}
//                   </td>

//                   {/* Status */}
//                   <td className="p-4">
//                     <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md">
//                       Pending
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td
//                     className="p-4 flex gap-2 justify-end"
//                     onClick={(e) => e.stopPropagation()}>
//                     <button
//                       onClick={() => handleApprove(p.id)}
//                       className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700">
//                       <Check size={14} /> Approve
//                     </button>

//                     <button
//                       onClick={() => handleReject(p.id)}
//                       className="flex items-center gap-1 bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700">
//                       <X size={14} /> Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </motion.div>
//       )}

//       {/* Modal */}
//       {selected && (
//         <PropertyModal
//           property={selected}
//           onClose={closeModal}
//           onApprove={handleApprove}
//           onReject={handleReject}
//         />
//       )}
//     </div>
//   );
// }

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
} from 'lucide-react';
import PropertyModal from '../pages/PropertyModal';
import { toast } from 'sonner';

export default function ApprovalsPage() {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(false);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const [locationFilter, setLocationFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

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
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/property/${id}/approve`
      );
      setSelected((prev) => (prev ? { ...prev, approved: true } : null));
      fetchPendingApprovals();
      setSelected(null);
      toast.success('Property approved successfully');
    } catch (error) {
      console.error('Approve error:', error);

      // Detect backend response
      const msg = error?.response?.data?.message;

      if (msg === 'This property is already approved.') {
        toast.info('Already approved');
        return;
      }

      toast.error('Failed to approve property');
    }
  };

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

  // const handleToggleActive = async (id, value) => {
  //   await axios.patch(
  //     `http://localhost:5000/api/admin/property/${id}/toggle-active`,
  //     {
  //       isActive: value,
  //     }
  //   );
  //   fetchPendingApprovals(); // refresh list
  // };
  // const handleToggleActive = async (id, isActive) => {
  //   try {
  //     await axios.patch(
  //       `http://localhost:5000/api/admin/property/${id}/toggle-active`,
  //       { isActive }
  //     );

  //     // 🔥 Update local property state instantly
  //     setProperties((prev) =>
  //       prev.map((p) => (p.id === id ? { ...p, isActive } : p))
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/property/${id}/toggle-active`,
        { isActive }
      );

      // 1️⃣ Update properties state
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive } : p))
      );

      // 2️⃣ Update modal state (critical fix!)
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

  // const handleApprove = async (id) => {
  //   await axios.patch(
  //     `http://localhost:5000/api/admin/property/${id}/approve`
  //   );
  //   fetchPendingApprovals();
  //   setSelected(null);
  // };

  // const handleReject = async (id) => {
  //   await axios.patch(
  //     `http://localhost:5000/api/admin/properties/reject/${id}`
  //   );
  //   fetchPendingApprovals();
  //   setSelected(null);
  // };

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
              </tr>
            </thead>

            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="border-b hover:bg-gray-50 cursor-pointer transition">
                  <td className="p-4">
                    <img
                      src={JSON.parse(p.images)[0]}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>

                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4 text-gray-600">{p.location}</td>
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
                    {p.isActive ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
                        Inactive
                      </span>
                    )}
                  </td>
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
      {selected && (
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
      )}
    </div>
  );
}
