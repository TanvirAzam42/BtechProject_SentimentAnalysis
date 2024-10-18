import React, { useState } from 'react';
import './UploadData.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Placeholder function for sentiment analysis
const analyzeSentiment = (data, targetColumn) => {
  return data.map((row) => {
    const reviewText = row[targetColumn] ? row[targetColumn].toLowerCase() : ''; // Safely access targetColumn

    // Simple heuristic for sentiment classification
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

// Function to generate a downloadable CSV report
const generateCSV = (reportData) => {
  const header = Object.keys(reportData[0]);
  const csvContent =
    header.join(',') + '\n' +
    reportData.map(row => header.map(field => row[field]).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'sentiment_analysis_report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');
  const [columns, setColumns] = useState([]);
  const [reportData, setReportData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Parse the uploaded CSV file to get columns
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
        const rows = text.split('\n').map(row => row.split(',')).slice(1); // Skip header
        const data = rows.map((row) => {
          const obj = {};
          columns.forEach((col, index) => {
            obj[col] = row[index];
          });
          return obj;
        });

        const sentimentReport = analyzeSentiment(data, targetColumn);
        setReportData(sentimentReport);
      };

      reader.readAsText(file);
    }
  };

  const handleDownloadReport = () => {
    if (reportData.length > 0) {
      generateCSV(reportData);
    } else {
      alert('No report available to download.');
    }
  };

  // Calculate sentiment analysis results
  const getSentimentAnalysis = () => {
    const totalReviews = reportData.length;
    const positiveReviews = reportData.filter(row => row.sentiment === 'Positive').length;
    const negativeReviews = reportData.filter(row => row.sentiment === 'Negative').length;
    const neutralReviews = totalReviews - (positiveReviews + negativeReviews); // Calculate neutral reviews

    return {
      totalReviews,
      positiveReviews,
      negativeReviews,
      neutralReviews, // Include neutral reviews in the return object
    };
  };

  const sentimentAnalysis = getSentimentAnalysis();

  // Function to generate a PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Sentiment Analysis Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Reviews: ${sentimentAnalysis.totalReviews}`, 20, 40);
    doc.text(`Total Positive Reviews: ${sentimentAnalysis.positiveReviews}`, 20, 50);
    doc.text(`Total Negative Reviews: ${sentimentAnalysis.negativeReviews}`, 20, 60);
    doc.text(`Total Neutral Reviews: ${sentimentAnalysis.neutralReviews}`, 20, 70); // Add neutral reviews to PDF

    // Capture the pie chart and add it to the PDF
    const pieChartContainer = document.getElementById('pie-chart-container');
    html2canvas(pieChartContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 20, 80, 160, 90);
      doc.save('sentiment_analysis_report.pdf');
    });
  };

  return (
    <div className="upload-container">
      {/* Information container */}
      <div className="info-container">
        <h3>Instructions for Uploading Dataset</h3>
        <p>
          Sentiment analysis is an NLP technique that identifies and classifies emotions in text as positive, negative, or neutral. It helps understand opinions in reviews, social media, and feedback. There are fine-grained (detailed sentiment levels), aspect-based (sentiment on specific features), and emotion detection types. It's used in marketing, customer service, finance, and politics to gauge public opinion and improve decision-making.
        </p>
        <p>Please upload a CSV file containing your dataset.</p>
      </div>

      {/* Form container */}
      <form onSubmit={handleSubmit} className="upload-form">
        {/* File upload and buttons container */}
        <div className="file-upload-container">
          <input type="file" onChange={handleFileChange} className="file-input" accept=".csv" />
          <select
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="target-column-select"
          >
            <option value="">Select target column</option>
            {columns.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
          <button type="submit" className="upload-btn">Upload</button>
          <button type="button" onClick={handleDownloadReport} className="download-btn">Download CSV Report</button>
          <button type="button" onClick={generatePDFReport} className="download-btn">Download PDF Report</button>
        </div>
      </form>

      {/* Pie Chart and Analysis */}
      {reportData.length > 0 && (
        <div className="analysis-container">
          <h3>Sentiment Analysis Results</h3>
          <p>Total Reviews: {sentimentAnalysis.totalReviews}</p>
          <p>Total Positive Reviews: {sentimentAnalysis.positiveReviews}</p>
          <p>Total Negative Reviews: {sentimentAnalysis.negativeReviews}</p>
          <p>Total Neutral Reviews: {sentimentAnalysis.neutralReviews}</p> {/* Display neutral reviews */}

          <div id="pie-chart-container"> {/* Added this div for html2canvas */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Positive Reviews', value: sentimentAnalysis.positiveReviews },
                    { name: 'Negative Reviews', value: sentimentAnalysis.negativeReviews },
                    { name: 'Neutral Reviews', value: sentimentAnalysis.neutralReviews }, // Added neutral reviews to pie chart data
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#82ca9d" />
                  <Cell fill="#ff6347" />
                  <Cell fill="#ffd700" /> {/* Added color for neutral reviews */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadData;
