import { Bell, Menu } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header
      className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100
      ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100">
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
          <img
            src="/owner.jpg"
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
           <span className="font-medium text-gray-800 hidden md:block">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}
