from fastapi import APIRouter, Depends, HTTPException, Request, Response  # Tambahkan 'Request' dan 'Response' di sini
from app.models import User
from app.database import SessionLocal
from app.schemas import LoginSchema, RegisterSchema
from app.auth import hash_password, create_access_token, verify_password
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import timedelta
import jwt  # Jika diperlukan untuk mengdecode token

# Buat router baru
router = APIRouter()

@router.post("/register", summary="Register a new user")
def register_user(register_data: RegisterSchema, db: Session = Depends(SessionLocal)):
    hashed_password = hash_password(register_data.password)

    user = User(
        full_name=register_data.full_name,
        username=register_data.username,
        email=register_data.email,
        password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "Registration successful"}


@router.post("/login", summary="Login to get an access token")
def login_user(login_data: LoginSchema, db: Session = Depends(SessionLocal)):
    # Query by email or username
    user = db.query(User).filter(
        or_(User.email == login_data.identifier, User.username == login_data.identifier)
    ).first()
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.id}, expires_delta=timedelta(days=1))
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh", summary="Refresh access token")
def refresh_token(request: Request, response: Response, db: Session = Depends(SessionLocal)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No token found")
    try:
        payload = jwt.decode(token, "SECRET_KEY", algorithms=["HS256"])  # Gantilah SECRET_KEY dengan yang sesuai
        user_id = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    new_token = create_access_token({"sub": user_id}, timedelta(days=1))
    response.set_cookie(key="access_token", value=new_token, httponly=True, samesite="lax")
    return {"message": "Token refreshed"}
