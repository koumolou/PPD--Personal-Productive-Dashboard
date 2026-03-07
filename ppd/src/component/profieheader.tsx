import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface ProfileHeaderProps {
  statuss?: string;
}

function ProfileHeader({ statuss }: ProfileHeaderProps) {
  const [icons, setIcons] = useState(false);
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within its Provider');
  const { user } = context;
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Header Card */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 px-5 py-4 rounded-2xl">
        
        {/* Left — Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-500 border-2 border-slate-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <p className="text-white font-semibold text-sm">{user.username}</p>
            {statuss && (
              <p className="text-teal-400 text-xs mt-0.5">{statuss}</p>
            )}
          </div>
        </div>

        {/* Right — Menu Button */}
        <button
          onClick={() => setIcons(!icons)}
          className="text-slate-400 hover:text-white hover:bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center transition"
          aria-haspopup="true"
          aria-expanded={icons}
          aria-label="Open profile actions"
        >
          ⋮
        </button>
      </div>

      {/* Dropdown */}
      {icons && (
        <div
          className="absolute right-0 top-16 z-50 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2"
          role="menu"
        >
          {[
            { icon: '✏️', label: 'Edit profile' },
            { icon: '🖼️', label: 'Change photo' },
            { icon: '⚙️', label: 'Settings' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition"
              onClick={() => { navigate('/settings'); setIcons(false); }}
              role="menuitem"
            >
              {icon} {label}
            </button>
          ))}

          <div className="border-t border-slate-800 mt-1 pt-1">
            <button
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition"
              role="menuitem"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;