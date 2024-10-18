// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Ensure this file exists

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">ReviewSense</div>
      <ul className="nav-links">
        <li><Link to="/upload">Upload Data</Link></li>
        <li><Link to="/Advanced">Advanced</Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/Overveiw">Overview</Link></li>
        <li><button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
