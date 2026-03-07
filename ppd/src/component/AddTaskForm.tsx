import { useState, useEffect } from 'react';



interface AddTaskFormProps {
  addTask : (title : string) => void
}

function AddTaskForm({ addTask } : AddTaskFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState('');

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    if (!taskText.trim()) return;
    addTask(taskText.trim());
    setTaskText('');
    handleClose();
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={handleOpen}
        type="button"
        className="p-3 mb-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
      >
        Add Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />

          {/* Modal content */}
          <div
            className="relative z-10 bg-white rounded shadow-lg w-96 max-w-full p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()} // IMPORTANT
            role="dialog"
            aria-modal="true"
          >
            <h2 className="text-xl font-semibold">Add New Task</h2>

            <input
              autoFocus
              type="text"
              placeholder="Write task here"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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

export default AddTaskForm;
