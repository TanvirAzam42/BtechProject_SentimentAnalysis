import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  // Check token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login'); // Use navigate to redirect
    } else {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">ReviewSense</div>
      <ul className="nav-links">
        <li><Link to="/upload">Upload Data</Link></li>
        <li><Link to="/advanced">Advanced</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/overview">Overview</Link></li>
        <li>
          <button onClick={handleAuthButtonClick} className="auth-btn">
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
