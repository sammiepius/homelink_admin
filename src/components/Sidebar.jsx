// // import { Link, useLocation } from "react-router-dom";

// import { Building2, Home, LogOut, Menu, Settings, Users } from "lucide-react";

// // export default function Sidebar() {
// //   const { pathname } = useLocation();

// //   const menu = [
// //     { name: "Dashboard", path: "/" },
// //     { name: "Properties", path: "/properties" },
// //     { name: "Users", path: "/users" },
// //     { name: "Reports", path: "/reports" },
// //     { name: "Settings", path: "/settings" },
// //   ];

// //   return (
// //     <aside className="w-64 bg-white shadow-md h-full">
// //       <h1 className="text-2xl font-bold p-6">HomeLink Admin</h1>

// //       <nav className="mt-4">
// //         {menu.map((item) => (
// //           <Link
// //             key={item.name}
// //             to={item.path}
// //             className={`block px-6 py-3 hover:bg-gray-100 ${
// //               pathname === item.path ? "bg-teal-500 text-white" : ""
// //             }`}
// //           >
// //             {item.name}
// //           </Link>
// //         ))}
// //       </nav>
// //     </aside>
// //   );
// // }
// export default function Sidebar({ collapsed, onToggle }) {
//   return (
//     <aside
//       className={`${
//         collapsed ? 'w-20' : 'w-64'
//       } bg-white border-r h-full fixed transition-all duration-300 p-4`}>
//       <div className="flex items-center justify-between mb-8">
//         <h1
//           className={`text-lg font-bold text-gray-800 ${
//             collapsed ? 'hidden' : 'block'
//           }`}>
//           HomeLink Admin
//         </h1>
//         <Menu className="cursor-pointer" onClick={onToggle} />
//       </div>

//       <nav className="space-y-3 text-gray-700">
//         <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//           <Home size={18} />
//           {!collapsed && <span>Dashboard</span>}
//         </div>

//         <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//           <Building2 size={18} />
//           {!collapsed && <span>Properties</span>}
//         </div>

//         <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//           <Users size={18} />
//           {!collapsed && <span>Users</span>}
//         </div>

//         <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//           <Settings size={18} />
//           {!collapsed && <span>Settings</span>}
//         </div>

//         <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 mt-8">
//           <LogOut size={18} />
//           {!collapsed && <span>Logout</span>}
//         </div>
//       </nav>
//     </aside>
//   );
// }

// src/components/Sidebar.jsx
import { Home, Users, Settings, Building2, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-white border-r p-4 fixed h-full shadow-sm 
      transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
      <div className="flex items-center justify-between mb-8">
        <span
          className={`text-md font-bold  text-teal-600 ${
            sidebarOpen ? 'block' : 'hidden'
          }`}>
          HomeLink Admin
        </span>
        <Menu
          className="cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      <nav className="space-y-4 text-gray-700">
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Home size={20} /> {sidebarOpen && 'Dashboard'}
        </div>

        <div
          onClick={() => navigate('/properties')}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Building2 size={20} /> {sidebarOpen && 'Properties'}
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Users size={20} /> {sidebarOpen && 'Users'}
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Settings size={20} /> {sidebarOpen && 'Settings'}
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 mt-8">
          <LogOut size={20} /> {sidebarOpen && 'Logout'}
        </div>
      </nav>
    </aside>
  );
}
