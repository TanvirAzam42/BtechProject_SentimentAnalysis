// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import './AboutUs.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Remove or comment out this navigation section */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
