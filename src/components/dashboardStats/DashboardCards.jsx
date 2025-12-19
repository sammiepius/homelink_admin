// components/DashboardCard.jsx
import { motion } from 'framer-motion';

export default function DashboardCard({ title, value, Icon, onClick, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer backdrop-blur-xl bg-white/70 border border-white/40 
                 shadow-lg rounded-2xl p-6 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h2 className="text-4xl font-bold mt-1">{value}</h2>
        </div>

        <div
          className={`p-3 rounded-2xl bg-${color}-100 shadow-inner flex items-center justify-center`}>
          <Icon className={`h-7 w-7 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );
}
