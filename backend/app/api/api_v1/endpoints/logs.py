from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
import pandas as pd
import io
from app.db.session import get_db
from app.db.models import SecurityLog, Alert
from app.ml.engine import AnomalyDetector
from datetime import datetime

router = APIRouter()
detector = AnomalyDetector()

@router.get("/")
def get_logs(db: Session = Depends(get_db), limit: int = 100):
    logs = db.query(SecurityLog).order_by(SecurityLog.timestamp.desc()).limit(limit).all()
    return logs

@router.post("/upload")
async def upload_logs(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    
    # Run AI Detection
    predictions = detector.predict(df)
    
    new_logs = []
    for i, row in df.iterrows():
        pred = predictions[i]
        log = SecurityLog(
            timestamp=datetime.strptime(row['timestamp'], "%Y-%m-%d %H:%M:%S.%f") if 'timestamp' in row else datetime.utcnow(),
            ip_address=row.get('ip_address', '0.0.0.0'),
            location=row.get('location', 'Unknown'),
            request_count=int(row.get('request_count', 0)),
            failed_logins=int(row.get('failed_logins', 0)),
            response_time=float(row.get('response_time', 0)),
            traffic_volume=float(row.get('traffic_volume', 0)),
            is_anomaly=bool(pred['is_anomaly']),
            confidence_score=float(pred['confidence']),
            severity=pred['severity'],
            threat_type="Suspicious Activity" if pred['is_anomaly'] else "Normal"
        )
        db.add(log)
        new_logs.append(log)
        
        # Create alert if high severity anomaly
        if pred['is_anomaly'] and pred['severity'] == "High":
            alert = Alert(
                message=f"High severity anomaly detected from {log.ip_address}",
                severity="High",
                status="active"
            )
            db.add(alert)
            
    db.commit()
    return {"message": f"Processed {len(df)} logs. Found {sum(p['is_anomaly'] for p in predictions)} anomalies."}

@router.post("/generate-sample")
def generate_sample(db: Session = Depends(get_db)):
    from app.ml.data_generator import generate_cyber_logs
    df = generate_cyber_logs(100)
    
    # Train model if not exists
    if not detector.load_model():
        detector.train(generate_cyber_logs(1000))
        
    predictions = detector.predict(df)
    
    for i, row in df.iterrows():
        pred = predictions[i]
        log = SecurityLog(
            timestamp=row['timestamp'],
            ip_address=row['ip_address'],
            location=row['location'],
            request_count=int(row['request_count']),
            failed_logins=int(row['failed_logins']),
            response_time=float(row['response_time']),
            traffic_volume=float(row['traffic_volume']),
            is_anomaly=bool(pred['is_anomaly']),
            confidence_score=float(pred['confidence']),
            severity=pred['severity'],
            threat_type="Malicious Pattern" if pred['is_anomaly'] else "Normal"
        )
        db.add(log)
        if pred['is_anomaly']:
            alert = Alert(
                message=f"Anomaly detected: {log.ip_address} showed unusual {row.get('threat_type', 'behavior')}",
                severity=pred['severity'],
                status="active"
            )
            db.add(alert)
            
    db.commit()
    return {"message": "Generated 100 sample logs with AI labels."}
