import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os

class AnomalyDetector:
    def __init__(self, model_path="backend/app/ml/models/isolation_forest.joblib"):
        self.model_path = model_path
        self.model = None
        self.scaler = StandardScaler()
        
        # Create directory if not exists
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

    def preprocess(self, df):
        # Select numerical features for anomaly detection
        features = ['request_count', 'failed_logins', 'response_time', 'traffic_volume']
        X = df[features]
        return X

    def train(self, df):
        X = self.preprocess(df)
        self.scaler.fit(X)
        X_scaled = self.scaler.transform(X)
        
        # contamination is the expected proportion of outliers
        self.model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
        self.model.fit(X_scaled)
        
        # Save model and scaler
        joblib.dump({'model': self.model, 'scaler': self.scaler}, self.model_path)
        return "Model trained and saved successfully."

    def load_model(self):
        if os.path.exists(self.model_path):
            data = joblib.load(self.model_path)
            self.model = data['model']
            self.scaler = data['scaler']
            return True
        return False

    def predict(self, df):
        if self.model is None:
            if not self.load_model():
                raise Exception("Model not trained or loaded.")
        
        X = self.preprocess(df)
        X_scaled = self.scaler.transform(X)
        
        # IsolationForest returns -1 for outliers and 1 for inliers
        predictions = self.model.predict(X_scaled)
        scores = self.model.decision_function(X_scaled)
        
        # Convert to 1 for anomaly, 0 for normal
        # decision_function: lower values are more abnormal
        results = []
        for pred, score in zip(predictions, scores):
            is_anomaly = 1 if pred == -1 else 0
            # Normalize confidence score (0 to 1)
            # In IsolationForest, scores are roughly between -0.5 and 0.5
            confidence = float(np.clip(abs(score) * 2, 0, 1))
            
            results.append({
                "is_anomaly": is_anomaly,
                "confidence": confidence,
                "severity": "High" if is_anomaly and confidence > 0.6 else "Medium" if is_anomaly else "Low"
            })
            
        return results

if __name__ == "__main__":
    from data_generator import generate_cyber_logs
    detector = AnomalyDetector()
    df = generate_cyber_logs(1000)
    print("Training model...")
    detector.train(df)
    print("Predicting...")
    sample = df.head(5)
    preds = detector.predict(sample)
    print(preds)
