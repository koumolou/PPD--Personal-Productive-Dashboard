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
    <div className="max-w-xl mx-auto space-y-6">

      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={Avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-slate-700 object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h1 className="text-white font-bold text-xl">{username}</h1>
            <p className="text-teal-400 text-xs font-medium">{stat}</p>
            <p className="text-slate-400 text-sm italic">{bio}</p>
          </div>

          {/* Edit Button */}
          <button
            className="shrink-0 px-4 py-2 rounded-xl text-sm bg-teal-500 hover:bg-teal-400 text-white font-medium transition"
            onClick={() => setShowEdit(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-5" />

        {/* User Details */}
        <div className="space-y-2">
          {Object.entries(userDetails).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl"
            >
              <span className="text-slate-400 text-xs font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-white text-xs font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <ModalPortal>
          <EditProfile close={() => setShowEdit(false)} />
        </ModalPortal>
      )}
    </div>
  );
}

export default Profile;