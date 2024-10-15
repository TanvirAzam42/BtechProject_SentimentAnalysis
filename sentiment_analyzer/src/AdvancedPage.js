import React, { useState } from 'react';
import './AdvancedPage.css';
import Modal from './Modal';

const AdvancedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleButtonClick = (code) => {
    setCode(code); // Set the code to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="advanced-page">
      <div className="container">
        <p>Container 1</p>
        <button onClick={() => handleButtonClick('Code for Container 1')}>Random Forest</button>
      </div>
      <div className="container">
        <p>Container 2</p>
        <button onClick={() => handleButtonClick('Code for Container 2')}>Logistic Regression</button>
      </div>
      <div className="container">
        <p>Container 3</p>
        <button onClick={() => handleButtonClick('Code for Container 3')}>Neural Network</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} code={code} />
    </div>
  );
};

export default AdvancedPage;
