from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Cloud Security AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "SUPER_SECRET_SECURITY_KEY_2024_AI_SECURITY"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # DATABASE_URL: str = "postgresql://user:pass@localhost/dbname"
    # For simplicity in a portable demo, we'll use SQLite or a placeholder
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    
    CORS_ORIGINS: List[str] = ["*"]

    class Config:
        case_sensitive = True

settings = Settings()
