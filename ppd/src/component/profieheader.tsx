import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface ProfileHeaderProps {
  statuss: string; // the status text you display under the username
}

function ProfileHeader({ statuss }: ProfileHeaderProps) {
  const [icons, setIcons] = useState(false);
  const context = useContext(UserContext);

  if (!context) throw new Error('UserContext must be used within its Provider');

  const { user } = context;
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl shadow mx-2 mb-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-14 h-14 rounded-full border border-slate-700"
          />

          <div className="flex flex-col">
            <p className="text-white text-lg font-semibold">{user.username}</p>
            <p className="text-gray-400 text-sm">{statuss}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIcons(!icons)}
          className="text-white text-2xl px-2 py-1 hover:bg-slate-800 rounded-lg transition"
          aria-haspopup="true"
          aria-expanded={icons}
          aria-label="Open profile actions"
        >
          ⋮
        </button>
      </div>

      {/* Dropdown Menu */}
      {icons && (
        <div
          className="mx-2 bg-slate-800 text-white rounded-lg shadow p-3 space-y-2 animate-fadeIn mb-2.5"
          role="menu"
        >
          <button
            className="text-left hover:bg-slate-700 w-full px-2 py-1 rounded"
            onClick={() => navigate('/settings')}
            role="menuitem"
          >
            ✏️ Edit profile
          </button>

          <button
            className="text-left hover:bg-slate-700 w-full px-2 py-1 rounded"
            onClick={() => navigate('/settings')}
            role="menuitem"
          >
            🖼️ Change photo
          </button>

          <button
            className="text-left hover:bg-slate-700 w-full px-2 py-1 rounded"
            onClick={() => navigate('/settings')}
            role="menuitem"
          >
            ⚙️ Settings
          </button>

          <button
            className="text-left hover:bg-slate-700 w-full px-2 py-1 rounded"
            onClick={() => navigate('/settings')}
            role="menuitem"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileHeader;