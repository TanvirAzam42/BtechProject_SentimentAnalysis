import React, { useState } from 'react';
import './UploadData.css';

const UploadData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log('File uploaded:', file.name);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDownloadReport = () => {
    console.log('Download Report button clicked');
    // Implement download functionality here
  };

  return (
    <div className="upload-container">
      {/* Information container */}
      <div className="info-container">
        <h3>Instructions for Uploading Dataset</h3>
        <p>
          Sentiment analysis is an NLP technique that identifies and classifies emotions in text as positive, negative, or neutral. It helps understand opinions in reviews, social media, and feedback. There are fine-grained (detailed sentiment levels), aspect-based (sentiment on specific features), and emotion detection types. It's used in marketing, customer service, finance, and politics to gauge public opinion and improve decision-making.
        </p>
        <p>
          Please upload a CSV file containing your dataset.
        </p>
      </div>

      {/* Form container */}
      <form onSubmit={handleSubmit} className="upload-form">
        {/* File upload and buttons container */}
        <div className="file-upload-container">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button type="submit" className="upload-btn">Upload</button>
          <button type="button" onClick={handleDownloadReport} className="download-btn">Download Report</button>
        </div>
      </form>
    </div>
  );
};

export default UploadData;
