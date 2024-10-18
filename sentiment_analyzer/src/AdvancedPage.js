import React, { useState } from 'react';
import './AdvancedPage.css';
import Modal from './Modal';

const AdvancedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleButtonClick = (code) => {
    setCode(code);
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
plt.show()
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

print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))

df = pd.read_csv('preprocessed_Amazon_Unlocked_Mobile.csv')
df['Reviews'] = df['Reviews'].fillna('').astype(str)
sia = SentimentIntensityAnalyzer()
df['polarity_score'] = df['Reviews'].apply(lambda x: sia.polarity_scores(x)['compound'])
df['sentiment_label'] = df['polarity_score'].apply(lambda x: 'pos' if x > 0 else 'neg')

encoder = LabelEncoder()
y = encoder.fit_transform(df['sentiment_label'])

tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts(df['Reviews'])
sequences = tokenizer.texts_to_sequences(df['Reviews'])

max_length = 100
X = pad_sequences(sequences, maxlen=max_length, padding='post', truncating='post')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = Sequential([
    Embedding(input_dim=5000, output_dim=64, input_length=max_length),
    LSTM(64, return_sequences=True),
    Dropout(0.2),
    LSTM(64),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

with tf.device('/GPU:0'):
    history = model.fit(X_train, y_train, epochs=5, batch_size=64, validation_data=(X_test, y_test))

test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f'Test Accuracy: {test_accuracy}')

y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int)

print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=['neg', 'pos']))

conf_matrix = confusion_matrix(y_test, y_pred)
print(conf_matrix)
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

  const data = [
    {
      title: 'Random Forest',
      description: 'Random Forest is a powerful ensemble learning method used for sentiment analysis, where it classifies text data (such as reviews) into categories like positive or negative. It builds multiple decision trees on random subsets of the data and features, and makes predictions by averaging the results, which reduces the risk of overfitting. This method is effective for handling high-dimensional text features (like those created by TF-IDF) and provides robust performance even with noisy or imbalanced data. While computationally intensive, Random Forest offers high accuracy and the ability to interpret feature importance, making it ideal for tasks like product review or social media sentiment analysis.In sentiment analysis, Random Forest is particularly useful because it can handle the complexities of textual data by capturing important patterns across multiple decision trees. By utilizing techniques like TF-IDF for feature extraction, it converts text into numerical vectors that the model can analyze. With its ensemble nature, Random Forest mitigates the biases and errors of individual trees, providing more stable and accurate predictions. Its ability to rank feature importance also allows insight into which words or phrases contribute most to the sentiment classification, making it both a powerful and insightful tool for understanding user opinions across various applications.',
      code: randomForestCode, // Adding Random Forest code here
    },
    {
      title: 'Logistic Regression',
      description: 'Logistic Regression is a widely used algorithm for sentiment analysis due to its simplicity and effectiveness in binary classification tasks, such as determining whether a review is positive or negative. It models the probability that a given input belongs to a particular class by using a linear combination of features and applying a sigmoid function to output probabilities between 0 and 1. By utilizing feature extraction techniques like TF-IDF, Logistic Regression can handle high-dimensional text data efficiently. It is computationally efficient, interpretable, and works well when there is a clear linear relationship between features and the sentiment outcome, making it a popular choice for sentiment classification tasks like product reviews or social media posts.Logistic Regression also excels in scenarios where speed and interpretability are important. It provides easily understandable weights for each feature, showing how individual words or terms impact the prediction. Regularization techniques can be applied to avoid overfitting, allowing the model to generalize better on unseen data. While it may struggle with more complex, non-linear relationships compared to ensemble methods like Random Forest, Logistic Regression is an excellent choice when a fast, interpretable model is needed for sentiment analysis.',
      code: logisticRegressionCode, // Logistic Regression code from earlier
    },
    {
      title: 'Neural Network',
      description: 'Neural Networks are highly effective for sentiment analysis, especially when dealing with large, complex datasets. By using multiple layers of neurons, these models can capture non-linear relationships in the data, making them ideal for tasks where sentiment is influenced by subtle patterns and context within the text. With techniques like word embeddings (e.g., Word2Vec or GloVe), Neural Networks can transform text into dense, continuous vector representations, enabling them to understand the semantic relationships between words. This allows Neural Networks to outperform simpler models like Logistic Regression in detecting nuanced sentiment, particularly in scenarios like product reviews or social media sentiment. Neural Networks, specifically architectures like Recurrent Neural Networks (RNNs) or Long Short-Term Memory (LSTM) networks, are particularly powerful for sequential data, where the order of words impacts meaning. While they require more computational resources and longer training times, they can model complex, non-linear relationships in text, providing a more in-depth understanding of sentiment. Additionally, advanced models such as transformers (e.g., BERT) have further improved the ability of Neural Networks to capture contextual meaning, making them state-of-the-art for many sentiment analysis tasks.',
      code: neuralNetworkCode, // Adding Neural Network code here
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