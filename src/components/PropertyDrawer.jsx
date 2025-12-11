import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PropertyDrawer({ property, onClose }) {
  if (!property) return null;

  const images = property.images ? JSON.parse(property.images) : [];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25 }}
      className="fixed top-0 right-0 h-full w-[380px] md:w-[420px] bg-white shadow-xl border-l z-50 p-4 overflow-y-auto"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <button
          onClick={onClose}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* IMAGES */}
      <div className="w-full h-48 bg-gray-200 rounded overflow-hidden mb-4">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt="property"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="space-y-3">
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium">{property.location}</p>
        </div>

        <div>
          <p className="text-gray-500">Price</p>
          <p className="font-semibold text-teal-600">
            ₦{property.price.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Bedrooms</p>
          <p className="font-medium">{property.bedrooms}</p>
        </div>

        <div>
          <p className="text-gray-500">Bathrooms</p>
          <p className="font-medium">{property.bathrooms}</p>
        </div>

        <div>
          <p className="text-gray-500">Description</p>
          <p className="text-gray-700">{property.description}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onApprove(property.id)}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(property.id)}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </motion.div>
  );
}
