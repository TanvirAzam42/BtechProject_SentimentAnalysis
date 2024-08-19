import React from 'react';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="info-section">
          <div className="scrolling-images">
            <img src={image1} alt="Feature 1" />
            <img src={image2} alt="Feature 2" />
            <img src={image3} alt="Feature 3" />
          </div>
          <div className="overlay-text">
            <h1>Welcome to the ReviewSense Dashboard</h1>
            <p>Use the navigation above to explore the features.</p>
          </div>
        </div>

        <div className="upload-button">
          <button onClick={handleUploadClick}>Upload Data</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
