import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <dialog open onClick={onClose}>
      <section onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div>
          <div>
          <h3>{title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="outline">
            Close
          </button>
        </div>
        <div>
          {children}
        </div>
      </section>
    </dialog>
  );
}; 