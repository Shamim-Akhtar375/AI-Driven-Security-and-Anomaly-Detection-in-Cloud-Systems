from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, dashboard, logs, alerts

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
