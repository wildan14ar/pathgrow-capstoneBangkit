from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from app.config import SECRET_KEY, ALGORITHM
from fastapi import Depends, HTTPException, status
from app.database import get_db  # Import get_db from the appropriate module
from app.models import User  # Import the User model from the appropriate module
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Fungsi ini akan memverifikasi token JWT dan memastikan pengguna adalah admin
def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Dekode token dan ambil user_id
    user_id = verify_token(token)
    
    # Ambil user dari database berdasarkan user_id
    user = db.query(User).filter(User.id == user_id).first()

    # Jika user tidak ditemukan atau bukan admin, lempar error
    if not user or user.role != 'admin':
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin access required",
        )

    return user