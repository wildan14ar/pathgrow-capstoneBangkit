from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes, predict_routes, admin_routes
from app.database import Base, engine

app = FastAPI(title="Career Prediction API", version="1.0")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(predict_routes.router, prefix="/predict", tags=["Prediction"])
app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])
