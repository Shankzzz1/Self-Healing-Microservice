from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
import pandas as pd
import joblib 
import os
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# --- Configuration ---
app = FastAPI()
DATA_FILE_NAME = "dataset.csv"  # <-- UPDATED FILENAME HERE
seq_len = 10
features = 2 # cpu_milli and memory_mib

# -------------------------------
# 1. KNOWLEDGE BASE (Anomaly Type to Corrective Action)
# -------------------------------
KNOWLEDGE_BASE = {
    "CPU_Contention": "Scale up CPU or increase service replicas",
    "Memory_Contention": "Restart service or increase memory limit",
    "Pod_Crash_Failure": "Restart service or check application logs",
    "Normal": "No action needed"
}

# -------------------------------
# 2. DATA PREPARATION FUNCTIONS
# -------------------------------

def prepare_training_data(df):
    """Prepares data for Isolation Forest and Random Forest."""
    # Isolation Forest Data (Unsupervised - only uses Running state as 'Normal')
    df_normal = df[df['pod_phase'] == 'Running'].copy()
    X_iso = df_normal[['cpu_milli', 'memory_mib']].values # Used for IF training

    # Random Forest Data (Supervised - creating labels)
    df_labeled = df[['cpu_milli', 'memory_mib', 'pod_phase']].copy()
    df_labeled['anomaly_type'] = 'Normal'
    
    # Label 1: CPU/Memory Contention (Based on high request in Pending phase)
    df_labeled.loc[(df_labeled['pod_phase'] == 'Pending') & (df_labeled['cpu_milli'] > 8000), 'anomaly_type'] = 'CPU_Contention'
    df_labeled.loc[(df_labeled['pod_phase'] == 'Pending') & (df_labeled['memory_mib'] > 16000), 'anomaly_type'] = 'Memory_Contention'
    
    # Label 2: Pod Crash/Failure
    df_labeled.loc[df_labeled['pod_phase'].isin(['Failed', 'Error']), 'anomaly_type'] = 'Pod_Crash_Failure'
    
    X_clf = df_labeled[['cpu_milli', 'memory_mib']].values # Used for RF features
    y_clf = df_labeled['anomaly_type'].values            # Used for RF labels
    
    return X_iso, X_clf, y_clf

def create_sequences(data_array, sequence_length):
    """Transforms a time-series 2D array into sequences for LSTM training."""
    X, y = [], []
    for i in range(len(data_array) - sequence_length):
        seq = data_array[i:(i + sequence_length), :]
        X.append(seq)
        label = data_array[i + sequence_length, :]
        y.append(label)
    return np.array(X), np.array(y)

def build_lstm_model(seq_len=10, features=2):
    """Defines the Keras LSTM model structure."""
    model = Sequential()
    model.add(LSTM(64, activation='relu', input_shape=(seq_len, features)))
    model.add(Dense(features))
    model.compile(optimizer='adam', loss='mse')
    return model

# -------------------------------
# 3. MODEL LOADING AND TRAINING (Executed only once on startup)
# -------------------------------

# Initialize variables globally
iso_model = None
clf = None
lstm_model = None
lstm_scaler = None

# --- Load raw data once ---
try:
    df_raw = pd.read_csv(DATA_FILE_NAME)
except FileNotFoundError:
    print(f"ERROR: Dataset file '{DATA_FILE_NAME}' not found. Cannot train real models.")
    # Fallback: create dummy models to prevent startup crash
    X_dummy = np.random.rand(10, 2).astype(np.float32)
    y_dummy = np.array(["Normal", "Contention"] * 5)
    iso_model = IsolationForest(contamination=0.1, random_state=42).fit(X_dummy)
    clf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_dummy, y_dummy)
    lstm_model = build_lstm_model(seq_len, features)
    lstm_scaler = MinMaxScaler().fit(X_dummy)
    print("INFO: Initialized with DUMMY models due to missing CSV file.")

else: # Execute this block if CSV was loaded successfully
    # --- Isolation Forest (IF) and Random Forest (RF) Training ---
    try:
        iso_model = joblib.load("iso_model.joblib")
        clf = joblib.load("clf_model.joblib")
        print("INFO: Loaded pre-trained Isolation Forest and Random Forest models.")
    except FileNotFoundError:
        print("INFO: Training IF/RF models on real data for the first time...") 
        X_iso_new, X_clf_new, y_clf_new = prepare_training_data(df_raw)

        iso_model = IsolationForest(contamination=0.01, random_state=42, max_samples=0.5)
        iso_model.fit(X_iso_new)
        joblib.dump(iso_model, "iso_model.joblib")

        clf = RandomForestClassifier(n_estimators=100, random_state=42)
        clf.fit(X_clf_new, y_clf_new)
        joblib.dump(clf, "clf_model.joblib")
        print("INFO: IF/RF Training complete. Models saved.")

    # --- LSTM Model Training ---
    try:
        lstm_model = joblib.load("lstm_model.joblib")
        lstm_scaler = joblib.load("lstm_scaler.joblib")
        print("INFO: Loaded pre-trained LSTM model and scaler.")
    except FileNotFoundError:
        print("INFO: Training LSTM model on real data for the first time...") 
        
        # 1. Filter and prepare data
        df_running = df_raw[df_raw['pod_phase'] == 'Running'].copy()
        data_to_sequence = df_running[['cpu_milli', 'memory_mib']].values.astype(np.float32)

        # 2. Scale the data (CRITICAL for LSTMs)
        lstm_scaler = MinMaxScaler()
        scaled_data = lstm_scaler.fit_transform(data_to_sequence)
        joblib.dump(lstm_scaler, "lstm_scaler.joblib")

        # 3. Create sequences
        X_seq, y_seq = create_sequences(scaled_data, seq_len)

        # 4. Build and train
        lstm_model = build_lstm_model(seq_len, features)
        lstm_model.fit(X_seq, y_seq, epochs=5, batch_size=32, verbose=0) 
        
        # 5. Save the trained model
        joblib.dump(lstm_model, "lstm_model.joblib") 
        print("INFO: LSTM model training complete. Model saved.")


# -------------------------------
# 4. INPUT SCHEMAS
# -------------------------------
class Metric(BaseModel):
    cpu: float
    memory: float

class SequenceInput(BaseModel):
    values: List[Metric]

# -------------------------------
# 5. ENDPOINTS
# -------------------------------

@app.get("/")
def home():
    return {"message": "Self-Healing Microservices ML Anomaly Detection Service Running!"}

@app.post("/self-heal")
def self_heal(input_data: SequenceInput):
    data = input_data.values
    results = []
    
    # --- Check for models being initialized with dummy if file was missing ---
    if iso_model is None:
        return {"error": f"ML models failed to load/train. Check if '{DATA_FILE_NAME}' is present."}

    # ---- Random Forest (RF) Classification (Point Anomaly Detection) ----
    for cpu, memory in [(d.cpu, d.memory) for d in data]:
        
        # Step 1: Isolation Forest (Used only for scoring/flagging, not for gating the action)
        pred_iso = iso_model.predict([[cpu, memory]])[0] 
        score = iso_model.decision_function([[cpu, memory]])[0]
        
        # Step 2: Random Forest Classification (Predicts the anomaly type directly)
        features_arr = np.array([cpu, memory]).reshape(1, -1)
        anomaly_type = clf.predict(features_arr)[0] 
        
        # Step 3: Determine final anomaly flag based on RF result
        # If RF classifies it as ANYTHING other than "Normal", it's an anomaly.
        anomaly_flag = True if anomaly_type != "Normal" else False

        # Step 4: Map anomaly type to corrective action using the Knowledge Base
        action = KNOWLEDGE_BASE.get(anomaly_type, "Investigate unknown anomaly")

        results.append({
            "cpu_milli": cpu,
            "memory_mib": memory,
            "anomaly": anomaly_flag,
            "score_iso": float(score), # Renamed to score_iso for clarity
            "type": anomaly_type,
            "action": action
        })

    # ---- LSTM sequence prediction (Time-Series Anomaly Detection) ----
    if lstm_model is not None and lstm_scaler is not None and len(data) >= seq_len:
        
        # Get the last sequence of metrics
        values_seq_raw = np.array([[d.cpu, d.memory] for d in data[-seq_len:]], dtype=np.float32)
        
        # 1. Scale the sequence data using the saved scaler
        scaled_input = lstm_scaler.transform(values_seq_raw)
        scaled_input = scaled_input.reshape(1, seq_len, features)

        # 2. Predict the next scaled point
        prediction_scaled = lstm_model.predict(scaled_input, verbose=0)
        
        # 3. Inverse transform (un-scale) the prediction to get actual metric values
        prediction_raw = lstm_scaler.inverse_transform(prediction_scaled)[0]
        pred_cpu, pred_mem = prediction_raw
        
        # Current actual values
        actual = data[-1] 
        
        # 4. Calculate error (difference between predicted raw value and actual raw value)
        error = abs(pred_cpu - actual.cpu) + abs(pred_mem - actual.memory)
        lstm_anomaly = bool(error > 2000) # Use a raw value threshold (e.g., 2000 mCPU/MiB error)

        lstm_action = "Investigate time-series trend anomaly (e.g., impending leak)" if lstm_anomaly else "No action needed"

        results.append({
            "cpu_milli_predicted": float(pred_cpu),
            "memory_mib_predicted": float(pred_mem),
            "anomaly": lstm_anomaly,
            "error": float(error),
            "type": "LSTM_Prediction",
            "action": lstm_action
        })

    return {"results": results}