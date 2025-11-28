// import { Bell, Menu } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar({ collapsed, onToggle }) {
//   return (
//     <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-6">
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onToggle}
//           className="md:hidden p-2 rounded-md hover:bg-gray-100">
//           <Menu />
//         </button>

//         <div className="hidden md:block">
//           <input
//             type="text"
//             placeholder="Search properties, users..."
//             className="border rounded-lg px-4 py-2 w-96 focus:ring-2 focus:ring-teal-500"
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Bell size={20} className="text-gray-600 cursor-pointer" />
//         <img
//           src="/mnt/data/A_2D_digital_image_displays_a_modern_admin_dashboa.png"
//           alt="mockup"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//       </div>
//     </header>
//   );
// }
// src/components/Topbar.jsx
import { Bell, Menu } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header
      className="
      flex items-center justify-between
      bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100
      "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu />
        </button>

        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search properties, users..."
            className="border border-gray-200 rounded-xl px-4 py-2 w-96 text-sm
                       focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800 hidden md:block">
            John Doe
          </span>

          <img
            src="/your-image.jpg"
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
}
