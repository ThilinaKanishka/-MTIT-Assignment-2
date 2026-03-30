from fastapi import FastAPI
import requests

app = FastAPI(title="API Gateway")

COURSE_SERVICE_URL = "http://localhost:8001"

# GET all courses
@app.get("/courses")
def get_courses():
    return requests.get(f"{COURSE_SERVICE_URL}/courses").json()

# GET course by ID
@app.get("/courses/{course_id}")
def get_course(course_id: int):
    return requests.get(f"{COURSE_SERVICE_URL}/courses/{course_id}").json()

# CREATE course
@app.post("/courses")
def add_course(course: dict):
    return requests.post(f"{COURSE_SERVICE_URL}/courses", json=course).json()

# UPDATE course
@app.put("/courses/{course_id}")
def update_course(course_id: int, course: dict):
    return requests.put(f"{COURSE_SERVICE_URL}/courses/{course_id}", json=course).json()

# DELETE course
@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    return requests.delete(f"{COURSE_SERVICE_URL}/courses/{course_id}").json()