import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, UploadCloud, List, LogOut, ChevronRight } from "lucide-react";

export default function InstructorLayout({ children }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Instructor";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-700/40"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-semibold shadow-xl">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm text-gray-300">Welcome,</div>
              <div className="text-white font-semibold truncate">{name}</div>
            </div>
          </div>

          <nav className="space-y-2">
            <NavLink to="/instructor/dashboard" className={linkClass}>
              <Home className="w-5 h-5" />
              Dashboard
              <ChevronRight className="ml-auto w-4 h-4 opacity-60" />
            </NavLink>

            <NavLink to="/instructor/upload-course" className={linkClass}>
              <UploadCloud className="w-5 h-5" />
              Upload Course
              <ChevronRight className="ml-auto w-4 h-4 opacity-60" />
            </NavLink>

            <NavLink to="/instructor/courses" className={linkClass}>
              <List className="w-5 h-5" />
              Manage Courses
              <ChevronRight className="ml-auto w-4 h-4 opacity-60" />
            </NavLink>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm bg-transparent hover:bg-gray-700/40 transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-300" /> Logout
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            Instructor Panel — Manage your courses, subjects, topics and materials.
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Top header thin */}
            <header className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-300">Instructor Dashboard</div>
              <div className="text-xs text-gray-400">Secure. Fast. Modern.</div>
            </header>

            {/* Content card wrapper */}
            <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[70vh] text-gray-800">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}