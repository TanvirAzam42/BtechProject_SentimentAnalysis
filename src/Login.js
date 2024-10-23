import React, { useState } from 'react';
<<<<<<< Updated upstream:src/Login.js
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate, Link } from 'react-router-dom';
>>>>>>> Stashed changes:sentiment_analyzer/src/Login.js
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
<<<<<<< Updated upstream:src/Login.js
        // Call onLogin to update the isAuthenticated state in App.js
        onLogin();
        navigate('/dashboard'); // Navigate to the dashboard after login
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
=======
        // Save logged-in user email to localStorage
        localStorage.setItem('loggedInUser', email);
        
        // Navigate to dashboard upon successful login
        navigate('/dashboard');
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
>>>>>>> Stashed changes:sentiment_analyzer/src/Login.js
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
