from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import SecurityLog, Alert
from sqlalchemy import func
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_logs = db.query(SecurityLog).count()
    total_anomalies = db.query(SecurityLog).filter(SecurityLog.is_anomaly == True).count()
    active_alerts = db.query(Alert).filter(Alert.status == "active").count()
    
    # Severity distribution
    severity_dist = db.query(SecurityLog.severity, func.count(SecurityLog.id)).group_by(SecurityLog.severity).all()
    severity_data = {s: count for s, count in severity_dist}
    
    # Risk Score (dummy calculation for demo)
    risk_score = 0
    if total_logs > 0:
        risk_score = (total_anomalies / total_logs) * 100
    
    # Last 24 hours trend
    yesterday = datetime.utcnow() - timedelta(days=1)
    # Group by hour (simulated)
    
    return {
        "total_threats": total_anomalies,
        "risk_score": round(risk_score, 2),
        "anomaly_count": total_anomalies,
        "total_logs": total_logs,
        "active_alerts": active_alerts,
        "severity_distribution": severity_data,
        "threat_trend": [
            {"time": "00:00", "count": 5},
            {"time": "04:00", "count": 12},
            {"time": "08:00", "count": 8},
            {"time": "12:00", "count": 25},
            {"time": "16:00", "count": 15},
            {"time": "20:00", "count": 30},
        ]
    }
