import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new createRoot API for React 18
import App from './App';
import './index.css'; // Ensure this path points to your CSS file

// Find the HTML element with the ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the createRoot method to render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

