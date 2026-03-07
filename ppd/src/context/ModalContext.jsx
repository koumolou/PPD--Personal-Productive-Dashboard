import { createContext, useState } from 'react';

export const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function openModal(content) {
    setModalContent(content);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalContent(null);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
