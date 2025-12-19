import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  User,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPendingApprovals();
  // }, []);

  // const fetchPendingApprovals = async () => {
  //   try {
  //     setLoading(true);

  //     const token = localStorage.getItem('adminToken');
  //     const res = await axios.get(
  //       'http://localhost:5000/api/admin/properties',
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setProperty(res.data || []);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //   }
  // };
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/property/${id}/approve`
      );
      //   setSelected((prev) => (prev ? { ...prev, approved: true } : null));
      fetchProperty();
      //   setSelected(null);
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
      fetchProperty();
      //   setSelected(null);
    } catch (error) {
      console.error('Reject error:', error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (loading)
    return <p className="text-center mt-10">Loading property details...</p>;
  if (!property)
    return <p className="text-center mt-10">Property not found.</p>;

  const images = Array.isArray(property.images)
    ? property.images
    : JSON.parse(property.images || '[]');

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="min-h-screen bg-gray-50 pt-8 pb-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          {images.length > 0 ? (
            <>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={property.title}
                className="w-full h-96 object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}

          <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
            {property.type === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4 px-6">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  currentIndex === index
                    ? 'border-teal-600 scale-105'
                    : 'border-transparent'
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {property.approved ? (
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1">
              <CheckCircle size={14} /> Approved
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 flex items-center gap-1">
              Pending
            </span>
          )}

          {property.isActive ? (
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Active
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600">
              Inactive
            </span>
          )}
        </div>

        {/* Property Info */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {property.title}
          </h2>
          <p className="text-gray-500 text-lg mb-3">{property.location}</p>
          <p className="text-2xl font-semibold text-teal-700 mb-6">
            ₦{property.price.toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <span>🛏️ {property.bedrooms || 0} Bedrooms</span>
            <span>🛁 {property.bathrooms || 0} Bathrooms</span>
            {/* <div className="flex items-center gap-2 mt-4">
              <User size={18} className="text-gray-500" />
              <p className="text-gray-700">
                Landlord: <b>{property.landlordId?.name}</b>
              </p>
            </div> */}
          </div>

          <p className="text-gray-700 leading-relaxed mb-10">
            {property.description || 'No description provided.'}
          </p>

          <div className="flex items-center justify-between">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => alert('Contact feature coming soon!')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition">
              📞 Contact Landlord
            </motion.button> */}
            {/* <button
              onClick={() => handleFavorite(property.id)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2">
              ❤️ Save to Favorites
            </button> */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleReject(property.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                <Ban size={16} /> Reject
              </button>

              {/* <button
                onClick={() => handleApprove(property.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <CheckCircle size={16} /> Approve
              </button> */}
              <button
                onClick={() => handleApprove(property.id)}
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
                Approve
                {/* {property.approved ? 'Approved' : 'Approve'} */}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ← Go Back
            </motion.button>
          </div>

          {/* </div> */}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* Draggable Image (for swipe) */}
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) handleNext();
                else if (info.offset.x > 100) handlePrev();
              }}
            />

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
                  <ChevronLeft size={26} color="white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3">
                  <ChevronRight size={26} color="white" />
                </button>
              </>
            )}

            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 rounded-full p-2">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
