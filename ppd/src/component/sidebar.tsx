import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";

// Type for each sidebar link
interface SidebarLink {
  key: number;
  name: string;
  icon: string;
  route: string;
}

// Props for Sidebar component
interface SidebarProps {
  sidelinks: SidebarLink[];
}

function Sidebar({ sidelinks }: SidebarProps) {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Check if a route is active
  const isActive = (route: string) => location.pathname === route;

  // Disable body scroll on mobile sidebar open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* ===================== DESKTOP SIDEBAR ===================== */}
      <aside
        className={`hidden md:flex flex-col bg-slate-950 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand */}
        <div className="px-4 py-6 text-xl font-bold tracking-wide border-b border-slate-800">
          {collapsed ? "⚡" : "PPD"}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {sidelinks.map((link) => (
              <Link
                key={link.key}
                to={link.route}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.route)
                    ? "bg-slate-800 text-blue-400"
                    : "hover:bg-slate-900"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{link.name}</span>
                )}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-3 px-3 py-2 rounded-lg text-sm bg-slate-900 hover:bg-slate-800 transition"
        >
          {collapsed ? "➡ Expand" : "⬅ Collapse"}
        </button>
      </aside>

      {/* ===================== MOBILE SIDEBAR ===================== */}
      {/* Backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
          <span className="text-xl font-bold">PPD</span>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {sidelinks.map((link) => (
              <Link
                key={link.key}
                to={link.route}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base ${
                  isActive(link.route)
                    ? "bg-slate-800 text-blue-400"
                    : "hover:bg-slate-900 text-gray-300 hover:text-white"
                }`}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;