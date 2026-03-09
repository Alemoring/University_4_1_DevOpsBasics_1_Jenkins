from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_reset():
    response = client.get("/reset/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["value"], int)
    assert data["value"] == 0


def test_get():
    response = client.get("/reset/")

    data = response.json()

    result = data["value"]

    response = client.get("/get/")
    assert response.status_code == 200
    dataS = response.json()
    assert isinstance(dataS["value"], int)
    assert dataS["value"] == result

def test_plus():
    response = client.get("/get/")

    data = response.json()

    result = data["value"]

    response = client.get("/plus/")
    assert response.status_code == 200
    dataS = response.json()
    assert isinstance(dataS["value"], int)
    assert dataS["value"] == result + 1

def test_quatro():
    response = client.get("/get/")

    data = response.json()

    result = data["value"]

    response = client.get("/quatro/")
    assert response.status_code == 200
    dataS = response.json()
    assert isinstance(dataS["value"], int)
    assert dataS["value"] == result * result