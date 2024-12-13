Request:

``` json
{
  "gender": 1,
  "absence_days": 3,
  "weekly_self_study_hours": 10,
  "math_score": 85,
  "history_score": 78,
  "physics_score": 92,
  "chemistry_score": 88,
  "biology_score": 91,
  "english_score": 80,
  "geography_score": 75,
  "part_time_job": 0,
  "extracurricular_activities": 1,
  "average_score": 85
}

```

Response:

``` json
{
  "prediction": {
    "Accountant": 0.0,
    "Artist": 0.0,
    "Banker": 0.0,
    "Business Owner": 0.0,
    "Construction Engineer": 0.0,
    "Designer": 0.0,
    "Doctor": 0.0,
    "Game Developer": 0.0,
    "Government Officer": 0.0,
    "Lawyer": 0.0,
    "Real Estate Developer": 0.0,
    "Scientist": 0.0,
    "Social Network Studies": 0.0,
    "Software Engineer": 0.0,
    "Stock Investor": 0.0,
    "Teacher": 100.0,
    "Writer": 0.0
  },
  "success": true
}

```