from fastapi import APIRouter, Depends, HTTPException
from app.database import SessionLocal
from app.models import Prediction
from sqlalchemy.orm import Session
import pandas as pd
from io import StringIO
from app.models import Prediction


# Inisialisasi router
router = APIRouter()

# Route untuk ekspor hasil prediksi ke CSV
@router.get("/export", summary="Export predictions", description="Export semua prediksi user ke CSV")
def export_predictions(db: Session = Depends(SessionLocal)):
    try:
        # Ambil semua data prediksi
        predictions = db.query(Prediction).all()

        # Convert hasil prediksi ke DataFrame
        df = pd.DataFrame([{
            "user_id": p.user_id,
            "predicted_career": p.predicted_career,
            "probability": p.probability
        } for p in predictions])

        # Convert DataFrame ke CSV
        csv_data = df.to_csv(index=False)
        
        # Simpan CSV ke dalam string dan kirimkan sebagai response
        return {"filename": "predictions.csv", "data": csv_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
