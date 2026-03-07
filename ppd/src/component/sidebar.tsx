import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";

interface SidebarLink {
  key: number;
  name: string;
  icon: string;
  route: string;
}

interface SidebarProps {
  sidelinks: SidebarLink[];
}

function Sidebar({ sidelinks }: SidebarProps) {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('');
  const { isSidebarOpen, closeSidebar } = context;
  
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (route: string) => location.pathname === route;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  return (
    <>
      {/* ===================== DESKTOP SIDEBAR ===================== */}
      <aside
        className={`hidden md:flex flex-col bg-slate-950 border-r border-slate-800 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-60"
        }`}
      >
        {/* Brand */}
        <div className="px-4 py-5 border-b border-slate-800 flex items-center justify-center">
          {collapsed ? (
            <span className="text-teal-400 font-bold text-xl">P</span>
          ) : (
            <span className="text-teal-400 font-bold text-xl tracking-widest">PPD</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {sidelinks.map((link) => (
              <Link
                key={link.key}
                to={link.route}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive(link.route)
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {!collapsed && <span>{link.name}</span>}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-3 px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </aside>

      {/* ===================== MOBILE SIDEBAR ===================== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800 text-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <span className="text-teal-400 font-bold text-xl tracking-widest">PPD</span>
          <button
            onClick={closeSidebar}
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6">
          <ul className="space-y-1">
            {sidelinks.map((link) => (
              <Link
                key={link.key}
                to={link.route}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive(link.route)
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;