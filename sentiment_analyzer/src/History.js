import React, { useState, useEffect } from 'react';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('reportHistory')) || [];
    const currentUser = localStorage.getItem('currentUser'); // Get current user

    // Filter history for the logged-in user
    const userHistory = storedHistory.filter(report => report.user === currentUser);
    setHistory(userHistory);
  }, []);

  return (
    <div className="history-container">
      <h2>Report History</h2>
      {history.length > 0 ? (
        history.map((report, index) => (
          <div key={index} className="history-item">
            <h3>Timestamp: {report.timestamp}</h3>
            <p>Total Reviews: {report.totalReviews}</p>
            <p>Positive Reviews: {report.positiveReviews}</p>
            <p>Negative Reviews: {report.negativeReviews}</p>
            <p>Neutral Reviews: {report.neutralReviews}</p>
          </div>
        ))
      ) : (
        <p>No history found for this account.</p>
      )}
    </div>
  );
};

export default History;
