// src/components/Overview.js
import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <div className="overview-container">
      <h1>Project Overview</h1>

      <section className="overview-section">
        <h2>Introduction</h2>
        <p>
          This project is centered around sentiment analysis on Amazon reviews in the electronics category. 
          Using Natural Language Processing (NLP) techniques, we analyze and classify reviews as positive, negative, or neutral.
        </p>
      </section>

      <section className="overview-section">
        <h2>Key Features</h2>
        <center>
       
          <li>Sentiment Classification using VADER Sentiment Analyzer</li>
          <li>Data Preprocessing and Cleaning</li>
          <li>Model Evaluation and Performance Metrics</li>
          <li>Interactive User Interface for Data Upload and Visualization</li>
        
        </center>
      </section>

      <section className="overview-section">
        <h2>Data Processing</h2>
        <p>
          We process and clean the data by removing missing values, tokenizing text, and applying the TF-IDF vectorization technique. 
          This prepares the data for model training and sentiment classification.
        </p>
      </section>

      <section className="overview-section">
        <h2>Modeling Techniques</h2>
        <p>
          The project employs the VADER sentiment analyzer for initial classification and uses Logistic Regression for the supervised learning model.
          The model is trained on labeled review data and evaluated for accuracy, precision, recall, and F1-score.
        </p>
      </section>

      <section className="overview-section">
        <h2>Data Visualization</h2>
        <p>
          Our system also includes visualizations, such as word clouds and confusion matrices, to help understand the distribution of sentiments and model performance.
        </p>
      </section>

      <section className="overview-section">
        <h2>How to Use</h2>
        <p>
          Users can upload their own dataset in CSV format through the Upload Data section. The system will process the data and provide reports, 
          including sentiment distribution and model accuracy.
        </p>
      </section>
    </div>
  );
};

export default Overview;