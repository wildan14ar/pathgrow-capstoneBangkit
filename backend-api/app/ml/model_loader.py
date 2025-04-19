from tensorflow.keras.models import load_model

model = load_model("app/ml/career_model.h5")

X_COLUMNS = [
    "gender", "absence_days", "weekly_self_study_hours",
    "math_score", "history_score", "physics_score",
    "chemistry_score", "biology_score", "english_score",
    "geography_score", "part_time_job", "extracurricular_activities", "average_score"
]

CLASS_LABELS = [
    'Lawyer', 'Doctor', 'Government Officer', 'Artist', 'Social Network Studies',
    'Software Engineer', 'Teacher', 'Business Owner', 'Scientist', 'Banker',
    'Writer', 'Accountant', 'Designer', 'Construction Engineer',
    'Game Developer', 'Stock Investor', 'Real Estate Developer'
]
