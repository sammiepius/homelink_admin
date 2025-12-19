import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({
  open,
  itemName,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Delete Property</h2>
          <button onClick={onClose}>
            <X className="text-gray-600" size={20} />
          </button>
        </div>

        <p className="text-gray-700">
          Are you sure you want to delete
          <span className="font-semibold"> {itemName}</span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
