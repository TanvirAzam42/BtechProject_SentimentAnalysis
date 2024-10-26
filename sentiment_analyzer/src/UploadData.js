import React, { useState, useEffect } from 'react';
import './UploadData.css';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to analyze sentiment
const analyzeSentiment = (data, targetColumn) => {
  return data.map((row) => {
    const reviewText = row[targetColumn] ? row[targetColumn].toLowerCase() : '';

    let sentiment = 'Neutral';
    if (reviewText.includes('good') || reviewText.includes('great') || reviewText.includes('excellent')) {
      sentiment = 'Positive';
    } else if (reviewText.includes('bad') || reviewText.includes('poor') || reviewText.includes('terrible')) {
      sentiment = 'Negative';
    }

    return {
      [targetColumn]: row[targetColumn],
      sentiment,
    };
  });
};

// Function to save analysis results to backend
const saveAnalysisResults = async (results) => {
  if (!results || !results.totalReviews) {
    console.warn("No sentiment results to save.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/api/history/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results),
    });
    if (!response.ok) throw new Error(`Failed to save results: ${response.statusText}`);
    const data = await response.json();
    console.log("Save Result:", data);
  } catch (error) {
    console.error("Error saving results:", error);
  }
};

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');
  const [columns, setColumns] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [user, setUser] = useState('');

  // Get the logged-in user from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      const header = rows[0];
      setColumns(header);
    };
    reader.readAsText(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file && targetColumn) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(',')).slice(1);
        const data = rows.map((row) => {
          const obj = {};
          columns.forEach((col, index) => {
            obj[col] = row[index];
          });
          return obj;
        });

        const sentimentReport = analyzeSentiment(data, targetColumn);
        setReportData(sentimentReport);

        // Prepare data to save to backend
        const resultsData = {
          user: user,
          totalReviews: sentimentReport.length,
          positiveReviews: sentimentReport.filter(row => row.sentiment === 'Positive').length,
          negativeReviews: sentimentReport.filter(row => row.sentiment === 'Negative').length,
          neutralReviews: sentimentReport.filter(row => row.sentiment === 'Neutral').length,
        };

        // Save the analysis results to the backend
        saveAnalysisResults(resultsData);
      };

      reader.readAsText(file);
    }
  };

  const downloadCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Total Reviews,Positive Reviews,Negative Reviews,Neutral Reviews\n${reportData.length},${reportData.filter(row => row.sentiment === 'Positive').length},${reportData.filter(row => row.sentiment === 'Negative').length},${reportData.filter(row => row.sentiment === 'Neutral').length}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sentiment_analysis.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

  const downloadPDF = () => {
    const input = document.getElementById('sentiment-analysis-results');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('sentiment-analysis.pdf');
      });
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Instructions for Uploading Dataset</h2>
        <p className="upload-instructions">
          Sentiment analysis is an NLP technique that identifies and classifies emotions in text as positive,
          negative, or neutral. It helps understand opinions in reviews, social media, and feedback.
        </p>
        <form onSubmit={handleSubmit} className="upload-form">
          <input type="file" onChange={handleFileChange} className="file-input" accept=".csv" />
          <select
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="target-column-select"
          >
            <option value="">Select target column</option>
            {columns.map((col, index) => (
              <option key={index} value={col}>{col}</option>
            ))}
          </select>
          <button type="submit" className="upload-btn">Upload</button>
          {reportData.length > 0 && (
            <div id="sentiment-analysis-results">
              <h3>Sentiment Analysis Results</h3>
              <p>Total Reviews: {reportData.length}</p>
              <p>Positive Reviews: {reportData.filter(row => row.sentiment === 'Positive').length}</p>
              <p>Negative Reviews: {reportData.filter(row => row.sentiment === 'Negative').length}</p>
              <p>Neutral Reviews: {reportData.filter(row => row.sentiment === 'Neutral').length}</p>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Positive Reviews', value: reportData.filter(row => row.sentiment === 'Positive').length },
                      { name: 'Negative Reviews', value: reportData.filter(row => row.sentiment === 'Negative').length },
                      { name: 'Neutral Reviews', value: reportData.filter(row => row.sentiment === 'Neutral').length },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#82ca9d" />
                    <Cell fill="#ff6347" />
                    <Cell fill="#ffd700" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="download-buttons">
            <button type="button" onClick={downloadCSV} className="download-btn">Download CSV Report</button>
            <button type="button" onClick={downloadPDF} className="download-btn">Download PDF Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadData;
