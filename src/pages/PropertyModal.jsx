// import { motion } from 'framer-motion';
// import { X, Bed, Bath, MapPin, User, CheckCircle, Ban } from 'lucide-react';

// export default function PropertyModal({
//   property,
//   onClose,
//   onApprove,
//   onReject,
//   onToggleActive,
// }) {
//   const images = property.images ? JSON.parse(property.images) : [];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ scale: 0.92 }}
//         animate={{ scale: 1 }}
//         className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
//         {/* TOP BAR */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h5 className="text-xl font-semibold">{property.title}</h5>

//           <button onClick={onClose}>
//             <X size={22} className="text-gray-600 hover:text-black" />
//           </button>
//         </div>

//         {/* IMAGE GALLERY */}
//         <div className="h-64 bg-gray-200 overflow-hidden">
//           {images.length > 0 ? (
//             <img src={images[0]} className="w-full h-full object-cover" />
//           ) : (
//             <div className="h-full flex justify-center items-center text-gray-400">
//               No images
//             </div>
//           )}
//         </div>

//         {/* CONTENT */}
//         <div className="p-6 space-y-4">
//           {/* STATUS BADGES */}
//           {/* <div className="flex gap-2">
//             {property.approved ? (
//               <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1">
//                 <CheckCircle size={14} /> Approved
//               </span>
//             ) : (
//               <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 flex items-center gap-1">
//                 Pending
//               </span>
//             )}

//             {property.isActive ? (
//               <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
//                 Active
//               </span>
//             ) : (
//               <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
//                 Inactive
//               </span>
//             )}
//           </div> */}

//           {/* BASIC INFO */}
//           <div className="text-gray-700 flex gap-4">
//             <span className="flex items-center gap-1">
//               <Bed size={16} /> {property.bedrooms}
//             </span>

//             <span className="flex items-center gap-1">
//               <Bath size={16} /> {property.bathrooms}
//             </span>

//             <span className="flex items-center gap-1">
//               <MapPin size={16} /> {property.location}
//             </span>
//           </div>

//           <p className="text-gray-600">{property.description}</p>

//           {/* LANDLORD INFO */}
//           <div className="flex items-center gap-2 mt-4">
//             <User size={18} className="text-gray-500" />
//             <p className="text-gray-700">
//               Landlord: <b>{property.landlord?.name}</b>
//             </p>
//           </div>

//           {/* ACTIVE TOGGLE */}
//           <div className="mt-6 flex items-center justify-between p-3 border rounded-lg">
//             <p className="text-gray-700 font-medium">Active on platform</p>

//             <button
//               onClick={() => onToggleActive(property.id, !property.isActive)}
//               className={`relative w-14 h-7 rounded-full transition ${
//                 property.isActive ? 'bg-blue-600' : 'bg-gray-400'
//               }`}>
//               <span
//                 className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition ${
//                   property.isActive ? 'translate-x-7' : ''
//                 }`}
//               />
//             </button>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               onClick={() => onReject(property.id)}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
//               <Ban size={16} />
//               Reject
//             </button>

//             <button
//               onClick={() => onApprove(property.id)}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
//               <CheckCircle size={16} />
//               Approve
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
import { motion } from 'framer-motion';
import { X, Bed, Bath, MapPin, User, CheckCircle, Ban } from 'lucide-react';
import SwitchToggle from '../components/SwitchToggle';

export default function PropertyModal({
  property,
  onClose,
  onApprove,
  onReject,
  onToggleActive,
}) {
  const images = property.images ? JSON.parse(property.images) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* TOP BAR */}
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-xl font-semibold">{property.title}</h5>

          <button onClick={onClose}>
            <X size={22} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* IMAGE */}
        <div className="h-64 bg-gray-200 overflow-hidden">
          {images.length > 0 ? (
            <img src={images[0]} className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex justify-center items-center text-gray-400">
              No images
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* BASIC INFO */}
          <div className="text-gray-700 flex gap-4">
            <span className="flex items-center gap-1">
              <Bed size={16} /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={16} /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {property.location}
            </span>
          </div>

          <p className="text-gray-600">{property.description}</p>

          {/* LANDLORD */}
          <div className="flex items-center gap-2 mt-4">
            <User size={18} className="text-gray-500" />
            <p className="text-gray-700">
              Landlord: <b>{property.landlord?.name}</b>
            </p>
          </div>

          {/* ACTIVE TOGGLE */}
          <div className="mt-6 flex items-center justify-between p-3 border rounded-lg">
            <p className="text-gray-700 font-medium">Active on platform</p>

            <SwitchToggle
              checked={property.isActive}
              onChange={(value) => onToggleActive(property.id, value)}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => onReject(property.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
              <Ban size={16} /> Reject
            </button>

            {/* <button
              onClick={() => onApprove(property.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <CheckCircle size={16} /> Approve
            </button> */}
            <button
              onClick={() => onApprove(property.id)}
              disabled={property.approved} // 🔥 Prevent another approval
              className={`
    px-4 py-2 rounded-lg flex items-center gap-2
    text-white
    ${
      property.approved
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-green-600 hover:bg-green-700'
    }
  `}>
              <CheckCircle size={16} />
              {property.approved ? 'Approved' : 'Approve'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
