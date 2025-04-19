from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()

# Fungsi untuk mendapatkan session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()