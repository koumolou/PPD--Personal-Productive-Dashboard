import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { SidebarContext } from '../context/SidebarContext';

interface NavbarProps {
  links: {
    name: string;
    path: string;
    key: number;
  }[];

}

function Navbar({ links } : NavbarProps) {
  const [openHeader, setOpenHeader] = useState(false);
  const context = useContext(UserContext);
  if (!context) throw new Error('');

  const { user } = context;

  const context1 = useContext(SidebarContext);
  if (!context1) throw new Error('');

  const { isSidebarOpen, toggleSidebar } = context1;

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event : MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenHeader(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    console.log('Sidebar open:', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <nav className="w-full bg-slate-950 z-20 top-0 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4 text-white">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          PPD
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li
              key={link.key}
              className="cursor-pointer hover:text-blue-400 hover:underline"
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Avatar + Hamburger */}
        <div className="flex items-center space-x-4 relative">
          <img
            onClick={() => setOpenHeader(!openHeader)}
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            aria-expanded={openHeader}
          />

          {/* Dropdown */}
          {openHeader && (
            <div
              ref={dropdownRef}
              className="transition-transform duration-200 ease-out bg-slate-900 absolute right-0 md:-right-7 top-12 z-50 w-60 rounded-2xl shadow-lg p-2"
              role="menu"
              tabIndex= {0}
            >
              <ul>
                <li className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-slate-950">
                  👤 {user?.username}
                </li>
                <li className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-slate-950">
                  📧 {user?.email}
                </li>
                <li className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-slate-950">
                  🕒 {user?.joinedDate}
                </li>
                <li>
                  <button
                    className="p-2 m-2 bg-slate-950 text-white rounded w-full"
                    onClick={() => navigate('/profile')}
                  >
                    Edit Details
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-2xl"
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
