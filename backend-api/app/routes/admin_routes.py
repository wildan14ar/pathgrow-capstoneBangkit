from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, Prediction
from app.auth import get_current_admin  # Sesuaikan dengan pengaturan auth kamu

router = APIRouter()

@router.get("/stats")
def prediction_stats(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    total_users = db.query(func.count(User.id)).scalar()
    total_predictions = db.query(func.count(Prediction.id)).scalar()

    top_careers = db.query(
        func.jsonb_each_text(Prediction.prediction_result)
    ).all()

    career_count = {}
    for k, v in top_careers:
        career_count[k] = career_count.get(k, 0) + 1

    return {
        "total_users": total_users,
        "total_predictions": total_predictions,
        "career_distribution": career_count
    }
