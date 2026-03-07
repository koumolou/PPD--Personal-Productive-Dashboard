import { useState } from "react";
import Avatar from "../assets/Avatar.jpg";
import EditProfile from "./EditProfile";
import ModalPortal from "../component/ModalPortal";

interface ProfileProps {
  username?: string;
  bio?: string;
  stat?: string;
}

function Profile({
  username = "Abisoye",
  bio = "This is my bio",
  stat = "Active ✅",
}: ProfileProps) {
  const [showEdit, setShowEdit] = useState(false);

  const userDetails: Record<string, string> = {
    fullName: "Abisoye Taiwo",
    email: "abisoye@gmail.com",
    created: "July, 2025",
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 rounded-2xl shadow-lg p-6 flex flex-col space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={Avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-slate-700"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">{username}</h1>
          <p className="text-sm text-gray-400">{stat}</p>
          <p className="text-gray-300 italic mt-1">{bio}</p>
        </div>

        {/* Edit Button */}
        <div className="flex flex-col items-center md:items-end">
          <button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() => setShowEdit(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="border-t border-slate-700"></div>

      {/* User Details */}
      <div className="space-y-3">
        {Object.entries(userDetails).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between bg-slate-800 p-3 rounded-lg"
          >
            <span className="font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>

      {/* EDIT PROFILE MODAL — rendered via Portal */}
      {showEdit && (
        <ModalPortal>
          <EditProfile close={() => setShowEdit(false)} />
        </ModalPortal>
      )}
    </div>
  );
}

export default Profile;