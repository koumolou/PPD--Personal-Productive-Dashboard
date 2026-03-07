import { useContext, useState,  } from "react";
import type {ChangeEvent, FormEvent} from 'react';
import { UserContext } from "../context/UserContext";
import type { User } from "../types";

interface EditProfileFormProps {
  user: User 
  updateUser: (user: Partial<User>) => void;
  onCancel: () => void;
}



function EditProfileForm({ user, updateUser, onCancel }: EditProfileFormProps) {
  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateUser(formState);
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Username</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Avatar URL</label>
        <input
          type="text"
          name="avatar"
          value={formState.avatar}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded"
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {isEditing ? (
        <EditProfileForm
          user={user}
          updateUser={updateUser}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
            <div className="flex flex-col">
              <p className="font-semibold">{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-400 text-sm">Joined: {user.joinedDate}</p>
            </div>
          </div>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;