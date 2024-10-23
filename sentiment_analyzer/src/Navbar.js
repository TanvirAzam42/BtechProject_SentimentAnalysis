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
        <li><Link to="/advanced">Advanced</Link></li>
        <li><Link to="/history">History</Link></li> {/* Added History link */}
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/overview">Overview</Link></li>
        <li><button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
