import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import UploadData from './UploadData';
import AdvancedPage from './AdvancedPage';
import History from './History'; 
import Login from './Login'; // <--- Import the Login component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar for navigation */}
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Now Login is defined */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/upload" element={<UploadData />} />
          <Route path="/advanced" element={<AdvancedPage />} />
          <Route path="/history" element={<History />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
