interface EditProfileType {
  close : ()=>void
}


 function EditProfile({ close } : EditProfileType) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 p-5 rounded-xl w-[90%] max-w-md shadow-xl relative">

        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 text-white text-xl hover:text-red-400"
        >
          ✖
        </button>

        <h2 className="text-white text-lg font-semibold mb-4 text-center">
          Edit Profile
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 bg-slate-700 rounded-full"></div>

          <label className="mt-2 bg-blue-600 px-3 py-1 text-white rounded-lg cursor-pointer">
            Change Photo
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 block">Username:</label>
            <input type="text" className="w-full p-2 bg-slate-800 text-white rounded" />
          </div>

          <div>
            <label className="text-gray-300 block">Full Name:</label>
            <input type="text" className="w-full p-2 bg-slate-800 text-white rounded" />
          </div>

          <div>
            <label className="text-gray-300 block">Email:</label>
            <input type="email" className="w-full p-2 bg-slate-800 text-white rounded" />
          </div>

          <div>
            <label className="text-gray-300 block">Bio:</label>
            <textarea className="w-full p-2 bg-slate-800 text-white rounded h-16"></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="bg-green-600 px-4 py-2 text-white rounded-lg"
          >
            Save
          </button>

          <button
            type="button"
            onClick={close}
            className="bg-red-600 px-4 py-2 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;