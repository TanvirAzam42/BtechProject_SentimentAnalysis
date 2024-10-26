import React, { useState, useEffect, useCallback } from 'react';
import './History.css';

const fetchHistory = async (currentUser) => {
  try {
    const response = await fetch(`http://localhost:5001/api/history/${currentUser}`);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};

const History = () => {
  const [history, setHistory] = useState([]);
  const currentUser = localStorage.getItem('currentUser');

  const loadHistory = useCallback(async () => {
    const data = await fetchHistory(currentUser);
    setHistory(data);
  }, [currentUser]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="history-container">
      <h2>Report History</h2>
      {history.length > 0 ? (
        history.map((report, index) => (
          <div key={index} className="history-item">
            <h3>Timestamp: {new Date(report.timestamp).toLocaleString()}</h3>
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
