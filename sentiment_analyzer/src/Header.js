import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">ReviewSense</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/overview">Overview</a></li>
            <li><a href="/upload">Upload Data</a></li>
            <li><a href="/reports">View Reports</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/AboutUs">AboutUs</a></li>

            <li className="auth-buttons">
              <a href="/signup" className="button">Signup</a>
              <a href="/login" className="button">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
