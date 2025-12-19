// import React, { useEffect, useState } from 'react';
// import { MapPin } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// // import { FaMapMarkerAlt } from 'react-icons/fa';

// export default function Listings() {
//   const { type } = useParams();
//   const navigate = useNavigate();

//   const [filter, setFilter] = useState(type || 'all');
//   const [search, setSearch] = useState('');
//   const [activeImage, setActiveImage] = useState({});
//   const [fade, setFade] = useState({});
//   const [properties, setProperties] = useState([]);
//   const [intervals, setIntervals] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/properties');
//         setProperties(res.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();

//     // Cleanup on unmount — stop all intervals
//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, []);

//   const filteredProperties = properties.filter((p) => {
//     const matchesFilter = filter === 'all' || p.type === filter;
//     const matchesSearch =
//       p.name?.toLowerCase().includes(search.toLowerCase()) ||
//       p.location?.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   // Handle hover start (auto-slideshow)
//   const handleHoverStart = (id, length) => {
//     if (intervals[id]) return; // prevent multiple timers
//     const interval = setInterval(() => {
//       setFade((prev) => ({ ...prev, [id]: true }));
//       setTimeout(() => {
//         setActiveImage((prev) => ({
//           ...prev,
//           [id]: ((prev[id] || 0) + 1) % length,
//         }));
//         setFade((prev) => ({ ...prev, [id]: false }));
//       }, 300);
//     }, 2000);

//     setIntervals((prev) => ({ ...prev, [id]: interval }));
//   };

//   // Handle hover end (stop slideshow)
//   const handleHoverEnd = (id) => {
//     if (intervals[id]) {
//       clearInterval(intervals[id]);
//       setIntervals((prev) => {
//         const updated = { ...prev };
//         delete updated[id];
//         return updated;
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-10 lg:px-20 pt-24">
//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by location, title, or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
//         />

//         <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
//           {['all', 'rent', 'sale'].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-4 py-2 rounded-lg whitespace-nowrap ${
//                 filter === f
//                   ? 'bg-teal-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}>
//               {f === 'all' ? 'All' : f === 'rent' ? 'For Rent' : 'For Sale'}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           <p className="text-center text-gray-500 col-span-full">Loading...</p>
//         ) : filteredProperties.length > 0 ? (
//           filteredProperties.map((p) => {
//             const index = activeImage[p.id] || 0;
//             return (
//               <div
//                 key={p.id}
//                 onMouseEnter={() =>
//                   handleHoverStart(p.id, p.images ? p.images.length : 1)
//                 }
//                 onMouseLeave={() => handleHoverEnd(p.id)}
//                 className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
//                 {/* Image */}
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={
//                       p.images && p.images.length > 0
//                         ? p.images[index]
//                         : '/placeholder.jpg'
//                     }
//                     alt={p.name}
//                     className={`h-48 sm:h-52 md:h-44 w-full object-cover transition duration-500 ${
//                       fade[p.id] ? 'opacity-0' : 'opacity-100'
//                     }`}
//                   />
//                   <div className="absolute top-3 left-0 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-1 text-sm font-bold -skew-x-12 shadow-md">
//                     <span className="skew-x-12 inline-block">
//                       {p.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
//                     </span>
//                   </div>
//                   <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
//                     ₦{Number(p.price).toLocaleString()}
//                   </div>
//                 </div>

//                 {/* Details */}
//                 <div className="p-4 space-y-2">
//                   {/* <h2 className="text-lg font-semibold text-gray-900">
//                     ₦{Number(p.price).toLocaleString()}
//                   </h2> */}

//                   <div className="flex items-center text-gray-500 text-sm">
//                      {/* <FaMapMarkerAlt className="mr-1 text-teal-600" /> */}
//                     {/* <MapPin size={14} className="mr-1" /> */}
//                     {p.location}
//                   </div>

//                   <p className="text-sm text-gray-600">
//                     {p.bedrooms} Beds • {p.bathrooms} Baths
//                   </p>

//                   <button
//                     onClick={() => navigate(`/properties/${p.id}`)}
//                     className="mt-2 w-full py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">
//             No properties found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
import React from 'react';

export default function Properties() {
  return <div>Properties</div>;
}
