import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleCopy = () => {
    navigator.clipboard.writeText(code) // Use the Clipboard API to copy the code
      .then(() => {
        alert('Code copied to clipboard!'); // Notify the user
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <pre>{code}</pre> {/* Display the code in a <pre> block for formatting */}
        <button onClick={handleCopy} className="copy-button">Copy to Clipboard</button> {/* Copy button */}
      </div>
    </div>
  );
};

export default Modal;
