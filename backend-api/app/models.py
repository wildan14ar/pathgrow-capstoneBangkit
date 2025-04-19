from sqlalchemy import Column, Integer, String, JSON, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default="user")  # Sudah ada
    predictions = relationship("Prediction", back_populates="user")

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prediction_result = Column(JSON)

    # input features
    gender = Column(Integer)
    absence_days = Column(Integer)
    weekly_self_study_hours = Column(Integer)
    math_score = Column(Float)
    history_score = Column(Float)
    physics_score = Column(Float)
    chemistry_score = Column(Float)
    biology_score = Column(Float)
    english_score = Column(Float)
    geography_score = Column(Float)
    part_time_job = Column(Integer)
    extracurricular_activities = Column(Integer)
    average_score = Column(Float)

    user = relationship("User", back_populates="predictions")
