import type  { ReactNode, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode[];
}

function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  // Prevent click inside modal content from closing the modal by stopping propagation
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-black hover:text-black"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✖
            </button>

            {/* Title */}
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

            {/* Content */}
            <div className="mb-6">{children}</div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {actions?.map((action, i) => (
                <div key={i}>{action}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;