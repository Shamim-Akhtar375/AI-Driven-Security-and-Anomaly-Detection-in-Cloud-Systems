from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="user") # user, admin

class SecurityLog(Base):
    __tablename__ = "security_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    ip_address = Column(String, index=True)
    location = Column(String)
    request_count = Column(Integer)
    failed_logins = Column(Integer)
    response_time = Column(Float)
    traffic_volume = Column(Float)
    is_anomaly = Column(Boolean, default=False)
    confidence_score = Column(Float)
    threat_type = Column(String) # ddos, brute_force, etc.
    severity = Column(String) # Low, Medium, High, Critical

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    log_id = Column(Integer, ForeignKey("security_logs.id"))
    message = Column(String)
    status = Column(String, default="active") # active, resolved, dismissed
    severity = Column(String)
    is_read = Column(Boolean, default=False)
