import React, { useState } from 'react';
import './AdvancedPage.css';
import Modal from './Modal';

const AdvancedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleButtonClick = (code) => {
    setCode(code); // Set the code to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Define Random Forest code
  const randomForestCode = `
import pandas as pd
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import nltk
import seaborn as sns
import matplotlib.pyplot as plt

nltk.download('vader_lexicon')

df = pd.read_csv('preprocessed_Amazon_Unlocked_Mobile.csv')
df['Reviews'] = df['Reviews'].astype(str).fillna('')
sia = SentimentIntensityAnalyzer()
df['polarity_score'] = df['Reviews'].apply(lambda x: sia.polarity_scores(x)['compound'])
df['sentiment_label'] = df['polarity_score'].apply(lambda x: "pos" if x > 0 else "neg")

df['sentiment_label'] = LabelEncoder().fit_transform(df['sentiment_label'])

X = df['Reviews']
y = df['sentiment_label']

tfidf_vectorizer = TfidfVectorizer(max_features=200000)
X_tfidf = tfidf_vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)

random_forest_model = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest_model.fit(X_train, y_train)

y_pred = random_forest_model.predict(X_test)

print("\\nRandom Forest Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\\nClassification Report:\\n", classification_report(y_test, y_pred))

conf_matrix = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=['Negative', 'Positive'], yticklabels=['Negative', 'Positive'])
plt.xlabel("Predicted Labels")
plt.ylabel("True Labels")
plt.title("Confusion Matrix")
plt.show();
`;

  // Define Neural Network code
  const neuralNetworkCode = `
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix
from nltk.sentiment.vader import SentimentIntensityAnalyzer

df = pd.read_csv('preprocessed_Amazon_Unlocked_Mobile.csv')
df['Reviews'] = df['Reviews'].fillna('').astype(str)
sia = SentimentIntensityAnalyzer();
df['polarity_score'] = df['Reviews'].apply(lambda x: sia.polarity_scores(x)['compound']);
df['sentiment_label'] = df['polarity_score'].apply(lambda x: 'pos' if x > 0 else 'neg');

encoder = LabelEncoder();
y = encoder.fit_transform(df['sentiment_label']);

tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>");
tokenizer.fit_on_texts(df['Reviews']);
sequences = tokenizer.texts_to_sequences(df['Reviews']);

max_length = 100;
X = pad_sequences(sequences, maxlen=max_length, padding='post', truncating='post');

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42);

model = Sequential([
    Embedding(input_dim=5000, output_dim=64, input_length=max_length),
    LSTM(64, return_sequences=True),
    Dropout(0.2),
    LSTM(64),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
]);

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy']);

history = model.fit(X_train, y_train, epochs=5, batch_size=64, validation_data=(X_test, y_test));

test_loss, test_accuracy = model.evaluate(X_test, y_test);
print(f'Test Accuracy: {test_accuracy}');
`;

   // Define Logistic Regression code
   const logisticRegressionCode = `
import pandas as pd;
from nltk.sentiment import SentimentIntensityAnalyzer;
from sklearn.model_selection import train_test_split;
from sklearn.feature_extraction.text import TfidfVectorizer;
from sklearn.linear_model import LogisticRegression;
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix;
from sklearn.preprocessing import LabelEncoder;
import nltk;
import matplotlib.pyplot as plt;
import seaborn as sns;

nltk.download('vader_lexicon');

df = pd.read_csv('preprocessed_Amazon_Unlocked_Mobile.csv');
df['Reviews'] = df['Reviews'].astype(str).fillna('');
sia = SentimentIntensityAnalyzer();
df['polarity_score'] = df['Reviews'].apply(lambda x: sia.polarity_scores(x)['compound']);
df['sentiment_label'] = df['polarity_score'].apply(lambda x: "pos" if x > 0 else "neg");

df['sentiment_label'] = LabelEncoder().fit_transform(df['sentiment_label']);

X = df['Reviews'];
y = df['sentiment_label'];

tfidf_vectorizer = TfidfVectorizer(max_features=10000);
X_tfidf = tfidf_vectorizer.fit_transform(X);

X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42);

logistic_model = LogisticRegression(max_iter=200);
logistic_model.fit(X_train, y_train);

y_pred = logistic_model.predict(X_test);

print("Accuracy:", accuracy_score(y_test, y_pred));
print("Classification Report:", classification_report(y_test, y_pred));

conf_matrix = confusion_matrix(y_test, y_pred);

plt.figure(figsize=(8, 6));
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=['Negative', 'Positive'], yticklabels=['Negative', 'Positive']);
plt.xlabel("Predicted Labels");
plt.ylabel("True Labels");
plt.title("Confusion Matrix");
plt.show();
`;

  // Data array for buttons
  const data = [
    {
      title: 'Random Forest',
      description: 'Random Forest is a powerful ensemble learning method used for sentiment analysis, where it classifies text data (such as reviews) into categories like positive or negative.',
      code: randomForestCode, // Random Forest code
    },
    {
      title: 'Logistic Regression',
      description: 'Logistic Regression is a widely used algorithm for sentiment analysis due to its simplicity and effectiveness in binary classification tasks, such as determining whether a review is positive or negative.',
      code: logisticRegressionCode, // Logistic Regression code
    },
    {
      title: 'Neural Network',
      description: 'Neural Networks are highly effective for sentiment analysis, especially when dealing with large, complex datasets.',
      code: neuralNetworkCode, // Neural Network code
    }
  ];

  return (
    <div className="advanced-page">
      {data.map((item, index) => (
        <div className="container" key={index}>
          <p>{item.description}</p>
          <button onClick={() => handleButtonClick(item.code)}>{item.title}</button>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal} code={code} />
    </div>
  );
};

export default AdvancedPage;
