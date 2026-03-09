import { useState } from 'react';

interface AddHabitFormProps {
  addHabit: (addHabit: string) => void;
}

function AddHabitForm({ addHabit }: AddHabitFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [habitText, setHabitText] = useState('');

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    if (habitText.trim() === '') return;
    addHabit(habitText);
    setHabitText('');
    handleClose();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        type="button"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition"
      >
        + Add Habit
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-xl flex flex-col space-y-5 mx-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">New Habit</h2>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="e.g. Read for 30 minutes"
              value={habitText}
              onChange={(e) => setHabitText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
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
                className="px-4 py-2 rounded-xl text-sm bg-teal-500 hover:bg-teal-400 text-white font-medium transition"
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddHabitForm;