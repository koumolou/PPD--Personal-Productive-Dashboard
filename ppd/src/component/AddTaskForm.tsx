import { useState, useEffect } from 'react';

interface AddTaskFormProps {
  addTask: (title: string) => void;
}

function AddTaskForm({ addTask }: AddTaskFormProps) {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (showModal) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        type="button"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-medium transition"
      >
        + Add Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div
            className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-xl mx-4 flex flex-col space-y-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">New Task</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <input
              autoFocus
              type="text"
              placeholder="e.g. Finish project report"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl text-sm bg-green-500 hover:bg-green-400 text-white font-medium transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTaskForm;