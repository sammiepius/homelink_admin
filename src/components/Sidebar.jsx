import { useState, useEffect } from 'react';
import {
  Home,
  Users,
  Settings,
  Building2,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
  Activity,
  FileText,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosConfig';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    properties: false,
    activity: false,
  });

  const isActive = (path) => location.pathname.startsWith(path);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Auto close submenus when sidebar collapses
  useEffect(() => {
    if (!sidebarOpen) {
      setOpenMenus({ properties: false });
      setOpenMenus({ activity_log: false });
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-white border-r p-4 fixed h-full shadow-sm
      transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <span
          className={`text-md font-bold text-teal-600 ${
            sidebarOpen ? 'block' : 'hidden'
          }`}>
          HomeLink Admin
        </span>

        <Menu
          className="cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* NAV */}
      <nav className="space-y-4 text-gray-700">
        {/* DASHBOARD */}
        <div
          onClick={() => navigate('/dashboard')}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
            ${
              isActive('/dashboard')
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'hover:bg-gray-100'
            }
          `}>
          <Home size={20} />
          {sidebarOpen && 'Dashboard'}
        </div>

        {/* PROPERTIES */}
        <div>
          <div
            onClick={() => toggleMenu('properties')}
            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer
    ${
      isActive('/properties')
        ? 'bg-teal-50 text-teal-700 font-semibold'
        : 'hover:bg-gray-100'
    }
  `}>
            <div className="flex items-center gap-3">
              <Building2 size={20} />
              {sidebarOpen && 'Properties'}
            </div>

            {/* Chevron – hidden by default, visible on hover */}
            {sidebarOpen && (
              <div className="hidden group-hover:flex items-center">
                {openMenus.properties ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            )}
          </div>

          {/* SUB MENU */}
          {openMenus.properties && sidebarOpen && (
            <div className="ml-9 mt-1 space-y-1 text-sm">
              <div
                onClick={() => navigate('/properties')}
                className={`p-2 rounded-lg cursor-pointer
                  ${
                    isActive('/properties') &&
                    !isActive('/properties/approvals')
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-100'
                  }
                `}>
                All Properties
              </div>

              <div
                onClick={() => navigate('/properties/approvals')}
                className={`p-2 rounded-lg cursor-pointer
                  ${
                    isActive('/properties/approvals')
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-100'
                  }
                `}>
                Approvals
              </div>

              {/* <div
                onClick={() => navigate('/properties/archived')}
                className={`p-2 rounded-lg cursor-pointer
                  ${
                    isActive('/properties/archived')
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-100'
                  }
                `}>
                Archived
              </div> */}
            </div>
          )}
        </div>

        {/* USERS */}
        <div
          onClick={() => navigate('/users')}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
            ${
              isActive('/users')
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'hover:bg-gray-100'
            }
          `}>
          <Users size={20} />
          {sidebarOpen && 'Users'}
        </div>
        {/* PROPERTIES */}
        {/* ACTIVITY & LOGS */}
        <div>
          {/* Parent */}
          <div
            onClick={() => toggleMenu('activity')}
            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer
      ${
        isActive('/activity')
          ? 'bg-teal-50 text-teal-700 font-semibold'
          : 'hover:bg-gray-100'
      }
    `}>
            <div className="flex items-center gap-3">
              <Activity size={20} />
              {sidebarOpen && 'Activity & Logs'}
            </div>

            {sidebarOpen && (
              <div className="hidden group-hover:flex items-center">
                {openMenus.activity ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            )}
          </div>

          {/* Sub navigation */}
          {openMenus.activity && sidebarOpen && (
            <div className="ml-8 mt-2 space-y-1 text-sm">
              <div
                onClick={() => navigate('/activity/recent')}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
          ${
            location.pathname === '/activity/recent'
              ? 'bg-teal-100 text-teal-800'
              : 'hover:bg-gray-100'
          }
        `}>
                <Activity size={16} />
                Recent Activities
              </div>

              <div
                onClick={() => navigate('/activity/audit')}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
          ${
            location.pathname === '/activity/audit'
              ? 'bg-teal-100 text-teal-800'
              : 'hover:bg-gray-100'
          }
        `}>
                <FileText size={16} />
                Audit Logs
              </div>
            </div>
          )}
        </div>

        {/* SETTINGS */}
        <div
          onClick={() => navigate('/settings')}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
            ${
              isActive('/settings')
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'hover:bg-gray-100'
            }
          `}>
          <Settings size={20} />
          {sidebarOpen && 'Settings'}
        </div>

        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 mt-8">
          <LogOut size={20} />
          {sidebarOpen && 'Logout'}
        </div>
      </nav>
    </aside>
  );
}
