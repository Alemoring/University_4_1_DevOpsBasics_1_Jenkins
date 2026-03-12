from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import uvicorn

import json
import random

import asyncio
from datetime import datetime
from datetime import timedelta
from typing import List

data_file_path = "data.json"

roles = list()
locations = list()
friends = list()
actions = list()

with open(data_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
    
    roles = data.get("Роли")
    locations = data.get("Локации")
    friends = data.get("Встречные")
    actions = data.get("Занятия")

# print(roles)
# print(locations)
# print(friends)
# print(actions)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get/role/")
def read_root():
    if (random.randint(0, 1)):
        role = roles[random.randint(0, len(roles)-1)] 
    else:
        role = "Придумай сам"

    return {
        "role": role
    }

@app.get("/get/location/")
def read_root():
    if (random.randint(0, 1)):
        location = locations[random.randint(0, len(locations)-1)]
    else:
        location = "Придумай сам"

    return {
        "location": location
    }
    
@app.get("/get/friend/")
def read_root():
    if (random.randint(0, 1)):
        friend = friends[random.randint(0, len(friends)-1)]
    else:
        friend = "Придумай сам"

    return {
        "friend": friend
    }
    
@app.get("/get/action/")
def read_root():
    if (random.randint(0, 1)):
        action = actions[random.randint(0, len(actions)-1)]
    else:
        action = "Придумай сам"

    return {
        "action": action
    }

@app.get("/get/story/")
def generate_story():
    role = random.choice(roles)
    location = random.choice(locations)
    friend = random.choice(friends)
    action = random.choice(actions)

    story = f"Ты {role.lower()} в месте '{location}'. Там ты встретил {friend.lower()} и {action.lower()}."

    return {
        "role": role,
        "location": location,
        "friend": friend,
        "action": action,
        "story": story
    }