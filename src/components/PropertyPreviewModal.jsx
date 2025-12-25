export default function PropertyPreviewModal({
  open,
  loading,
  property,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div
        className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading property…
          </div>
        ) : !property ? (
          <div className="py-20 text-center text-gray-400">
            Property not found
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">{property.title}</h2>

            <p className="text-sm text-gray-500 mb-4">{property.location}</p>

            {/* Status */}
            <div className="flex gap-2 mb-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    property.approved
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                {property.approved ? 'Approved' : 'Pending'}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    property.isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                {property.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4">{property.description}</p>

            {/* Price */}
            <div className="font-semibold text-lg">
              ₦{Number(property.price).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
