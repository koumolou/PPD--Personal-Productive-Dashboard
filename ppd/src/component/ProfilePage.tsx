import { useContext, useState } from "react";
import type { ChangeEvent, SyntheticEvent } from 'react';
import { UserContext } from "../context/UserContext";
import type { User } from "../types";

interface EditProfileFormProps {
  user: User;
  updateUser: (user: Partial<User>) => void;
  onCancel: () => void;
}

function EditProfileForm({ user, updateUser, onCancel }: EditProfileFormProps) {
  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    updateUser(formState);
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: 'Username', name: 'username', type: 'text', value: formState.username },
        { label: 'Email', name: 'email', type: 'email', value: formState.email },
        { label: 'Avatar URL', name: 'avatar', type: 'text', value: formState.avatar },
      ].map(({ label, name, type, value }) => (
        <div key={name}>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm bg-teal-500 hover:bg-teal-400 text-white font-medium transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ProfilePage() {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext must be used within its Provider");
  const { user, updateUser } = context;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-lg mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg">Profile</h1>
        {!isEditing && (
          <button
            className="px-4 py-2 rounded-xl text-sm bg-teal-500 hover:bg-teal-400 text-white font-medium transition"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <EditProfileForm
          user={user}
          updateUser={updateUser}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        /* Profile View */
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-teal-500 border-2 border-slate-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </div>
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm">{user.username}</p>
            <p className="text-slate-400 text-xs">{user.email}</p>
            <p className="text-slate-600 text-xs">Joined {user.joinedDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;