import type { ReactNode, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode[];
}

function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          )}
          <button
            className="ml-auto text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-slate-300 text-sm mb-6">
          {children}
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
            {actions.map((action, i) => (
              <div key={i}>{action}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;