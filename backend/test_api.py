from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_get_role():
    response = client.get("/get/role/")
    assert response.status_code == 200

    data = response.json()
    assert "role" in data
    assert isinstance(data["role"], str)
    assert len(data["role"]) > 0


def test_get_location():
    response = client.get("/get/location/")
    assert response.status_code == 200

    data = response.json()
    assert "location" in data
    assert isinstance(data["location"], str)
    assert len(data["location"]) > 0


def test_get_friend():
    response = client.get("/get/friend/")
    assert response.status_code == 200

    data = response.json()
    assert "friend" in data
    assert isinstance(data["friend"], str)
    assert len(data["friend"]) > 0


def test_get_action():
    response = client.get("/get/action/")
    assert response.status_code == 200

    data = response.json()
    assert "action" in data
    assert isinstance(data["action"], str)
    assert len(data["action"]) > 0