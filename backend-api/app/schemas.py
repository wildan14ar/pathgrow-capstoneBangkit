from pydantic import BaseModel

class RegisterSchema(BaseModel):
    full_name: str
    username: str
    email: str
    password: str

class LoginSchema(BaseModel):
    # Allow login by email or username
    identifier: str  # user email or username
    password: str

class PredictionInput(BaseModel):
    gender: int
    absence_days: int
    weekly_self_study_hours: int
    math_score: float
    history_score: float
    physics_score: float
    chemistry_score: float
    biology_score: float
    english_score: float
    geography_score: float
    part_time_job: int
    extracurricular_activities: int
    average_score: float
