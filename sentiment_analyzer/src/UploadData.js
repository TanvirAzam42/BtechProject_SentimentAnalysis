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

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');
  const [columns, setColumns] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [user, setUser] = useState('');

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

        // Save the result in localStorage for history, including user email
        const reportHistory = JSON.parse(localStorage.getItem('reportHistory')) || [];
        const newReport = {
          user: user, // Save with the logged-in user
          timestamp: new Date().toISOString(),
          totalReviews: sentimentReport.length,
          positiveReviews: sentimentReport.filter(row => row.sentiment === 'Positive').length,
          negativeReviews: sentimentReport.filter(row => row.sentiment === 'Negative').length,
          neutralReviews: sentimentReport.filter(row => row.sentiment === 'Neutral').length,
        };

        localStorage.setItem('reportHistory', JSON.stringify([newReport, ...reportHistory]));
      };

      reader.readAsText(file);
    }
  };

  const downloadCSV = () => {
    // CSV downloading logic
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
        <p>
          Sentiment analysis is an NLP technique that identifies and classifies emotions in text as positive,
          negative, or neutral. It helps understand opinions in reviews, social media, and feedback. There are
          fine-grained (detailed sentiment levels), aspect-based (sentiment on specific features), and emotion detection types.
          It's used in marketing, customer service, finance, and politics to gauge public opinion and improve decision-making.
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
            <button onClick={downloadCSV} className="download-btn">Download CSV Report</button>
            <button onClick={downloadPDF} className="download-btn">Download PDF Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadData;
