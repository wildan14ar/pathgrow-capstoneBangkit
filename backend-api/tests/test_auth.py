from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():
    response = client.post("/auth/register", json={
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "Registration successful" in response.json().get("message", "")

def test_login():
    response = client.post("/auth/login", json={
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "Login successful" in response.json().get("message", "")
