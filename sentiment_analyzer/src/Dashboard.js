import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <>
      <div className="dashboard">
        <div className="info-section">
          <div className="overlay-text">
            <h1>Welcome to the ReviewSense Dashboard</h1>
            <p>Use the navigation above to explore the features.</p>
            {/* Optionally include an upload button for easy navigation */}
            <button className="upload-button" onClick={handleUploadClick}>
              Upload Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
