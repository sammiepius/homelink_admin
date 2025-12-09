// components/DashboardCard.jsx
import { motion } from "framer-motion";

export default function DashboardCard({ title, value, Icon, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-semibold mt-1">{value}</h2>
        </div>

        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="h-7 w-7 text-blue-600" />
        </div>
      </div>
    </motion.div>
  );
}
