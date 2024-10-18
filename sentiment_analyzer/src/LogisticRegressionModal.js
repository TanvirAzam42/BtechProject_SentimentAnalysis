// src/components/LogisticRegressionModal.js
import React, { useState } from 'react';
import './LogisticRegressionModal.css'; // Add styling for the modal here

const LogisticRegressionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const code = `
import pandas as pd
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import nltk
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import seaborn as sns
from collections import Counter

nltk.download('vader_lexicon')

df = pd.read_csv('preprocessed_Amazon_Unlocked_Mobile.csv')
df['Reviews'] = df['Reviews'].astype(str).fillna('')

sia = SentimentIntensityAnalyzer()
df['polarity_score'] = df['Reviews'].apply(lambda x: sia.polarity_scores(x)['compound'])
df['sentiment_label'] = df['polarity_score'].apply(lambda x: "pos" if x > 0 else "neg")
df['sentiment_label'] = LabelEncoder().fit_transform(df['sentiment_label'])

X = df['Reviews']
y = df['sentiment_label']
tfidf_vectorizer = TfidfVectorizer(max_features=10000)
X_tfidf = tfidf_vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)

logistic_model = LogisticRegression(max_iter=200)
logistic_model.fit(X_train, y_train)

y_pred = logistic_model.predict(X_test)
print("\\nLogistic Regression Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\\nClassification Report:\\n", classification_report(y_test, y_pred))

conf_matrix = confusion_matrix(y_test, y_pred)
print("\\nConfusion Matrix:\\n", conf_matrix)

plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=['Negative', 'Positive'], yticklabels=['Negative', 'Positive'])
plt.xlabel("Predicted Labels")
plt.ylabel("True Labels")
plt.title("Confusion Matrix")
plt.show()
`;

  return (
    <div>
      <button className="open-modal-btn" onClick={toggleModal}>
        Logistic Regression Code
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Logistic Regression Code</h2>
            <pre className="code-block">
              {code}
            </pre>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              Copy Code
            </button>
            <button className="close-btn" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticRegressionModal;
