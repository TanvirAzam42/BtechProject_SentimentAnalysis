import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">ReviewSense</h1>
        <nav>
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={menuOpen ? 'bar open' : 'bar'}></div>
            <div className={menuOpen ? 'bar open' : 'bar'}></div>
            <div className={menuOpen ? 'bar open' : 'bar'}></div>
          </div>
          <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/overview">Overview</a></li>
            <li><a href="/upload">Upload Data</a></li>
            <li><a href="/reports">View Reports</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li className="auth-buttons">
              <button className="button" onClick={() => window.location.href='/signup'}>Signup</button>
              <button className="button" onClick={() => window.location.href='/login'}>Login</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
