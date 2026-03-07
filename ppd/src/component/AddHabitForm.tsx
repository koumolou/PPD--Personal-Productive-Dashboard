import { useState } from 'react';


interface AddHabitFormProps{
  AddHabitForm : (addHabit : string) => void 
}


function AddHabitForm({ addHabit } : AddHabitFormProps ) {
  const [showModal, setShowModal] = useState(false);
  const [habitText, setHabitText] = useState('');

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    if (habitText.trim() === '') return; // ignore empty input
    addHabit(habitText); // call parent function
    setHabitText(''); // clear input
    handleClose(); // close modal
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={handleOpen}
        className="p-3 mb-2 rounded bg-blue-500 text-white hover:bg-blue-800 transition"
        type="button"
      >
        Add Habit
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded shadow-lg w-96 max-w-full p-6 z-10 flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Add New Habit</h2>
            <input
              type="text"
              placeholder="Write task here"
              value={habitText}
              onChange={(e) => setHabitText(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddHabitForm;
