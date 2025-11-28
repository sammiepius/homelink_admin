// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex flex-col flex-1 overflow-auto">
//         <Navbar />
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Home,
//   LogOut,
//   Bell,
//   Building2,
//   Settings,
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function AdminLayout({ children }) {
//   const [open, setOpen] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           open ? 'w-64' : 'w-20'
//         } bg-white shadow-md border-r transition-all duration-300 flex flex-col`}>
//         <div className="flex items-center justify-between p-4 border-b">
//           {/* "flex items-center justify-between mb-8" */}
//           <span
//             // className={`text-xl font-semibold transition-all duration-300 ${!open && "opacity-0"}`}
//             className={`text-sm font-bold text-gray-800 ${
//               open ? 'block' : 'hidden'
//             }`}>
//             HomeLink Admin
//           </span>
//           {/* <button onClick={() => setOpen(!open)}>
//             {open ? <X size={20} /> : <Menu size={20} />}
//           </button> */}
//           <Menu className="cursor-pointer" onClick={() => setOpen(!open)} />
//         </div>

//         <nav className="space-y-4 text-gray-700">
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Home size={20} /> {open && 'Dashboard'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Building2 size={20} /> {open && 'Properties'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Users size={20} /> {open && 'Users'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
//             <Settings size={20} /> {open && 'Settings'}
//           </div>
//           <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer text-red-500 mt-8">
//             <LogOut size={20} /> {open && 'Logout'}
//           </div>
//         </nav>

//         {/* <div className="p-4 border-t cursor-pointer flex items-center text-red-500">
//           <LogOut size={18} />
//           {open && <span className="ml-2">Logout</span>}
//         </div> */}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <Topbar />
//         <div className="p-6">{children}</div>
//       </main>
//     </div>
//   );
// }

// function SidebarLink({ to, icon, label, open }) {
//   return (
//     <Link
//       to={to}
//       className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700">
//       {icon}
//       {open && <span className="ml-3">{label}</span>}
//     </Link>
//   );
// }

// function Topbar({ collapsed, onToggle }) {
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
//           src=""
//           alt="mockup"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//       </div>
//     </header>
//   );
// }
// src/layout/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`
          flex-1 p-4 
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${sidebarOpen ? "ml-64" : "ml-20"}
        `}
      >
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
