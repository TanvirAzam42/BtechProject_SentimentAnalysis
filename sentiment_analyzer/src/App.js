// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import UploadData from './UploadData'; // Import the UploadData component
import Navbar from './Navbar'; // Import Navbar component
import AdvancedPage from './AdvancedPage';
import './AboutUs.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar is fixed at the top */}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/upload" element={<UploadData />} /> {/* Upload Data route */}
          <Route path="/advanced" element={<AdvancedPage />} /> 
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
