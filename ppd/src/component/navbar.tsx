import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { SidebarContext } from '../context/SidebarContext';

interface NavbarProps {
  links: {
    name: string;
    path: string;
    key: number;
  }[];
}

function Navbar({ links }: NavbarProps) {
  const [openHeader, setOpenHeader] = useState(false);
  const context = useContext(UserContext);
  if (!context) throw new Error('');
  const { user } = context;

  const context1 = useContext(SidebarContext);
  if (!context1) throw new Error('');
  const { toggleSidebar } = context1;

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenHeader(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-slate-950 z-20 top-0 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <div
          className="text-xl font-bold text-teal-400 cursor-pointer tracking-wide"
          onClick={() => navigate('/')}
        >
          PPD
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <li
              key={link.key}
              className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition"
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-3 relative">
          
          {/* Avatar */}
          <button
            onClick={() => setOpenHeader(!openHeader)}
            className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer border-2 border-slate-800 hover:border-teal-400 transition"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </button>

          {/* Dropdown */}
          {openHeader && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 z-50 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2"
              role="menu"
            >
              {/* User Info */}
              <div className="px-3 py-3 border-b border-slate-800 mb-2">
                <p className="text-white font-semibold text-sm">{user.username}</p>
                <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                <p className="text-slate-500 text-xs mt-0.5">Joined {user.joinedDate}</p>
              </div>

              {/* Actions */}
              <ul className="space-y-1">
                <li>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition"
                    onClick={() => { navigate('/settings'); setOpenHeader(false); }}
                  >
                    ⚙️ Settings
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition"
                    onClick={() => { navigate('/profile'); setOpenHeader(false); }}
                  >
                    👤 Edit Profile
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            type="button"
            aria-label="Toggle Menu"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;