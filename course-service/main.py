from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Course Service")
@app.get("/")
def home():
    return {"message": "Course Service is Running"}

# Temporary database (list)
courses = []

class Course(BaseModel):
    id: int
    courseName: str
    courseCode: str
    credits: int
    lecturerId: int

# GET all courses
@app.get("/courses", response_model=List[Course])
def get_courses():
    return courses

# GET course by ID
@app.get("/courses/{course_id}")
def get_course(course_id: int):

    for course in courses:
        if course.id == course_id:
            return course
    raise HTTPException(status_code=404, detail="Course not found")

# CREATE course
@app.post("/courses")
def add_course(course: Course):
    courses.append(course)
    return course

# UPDATE course
@app.put("/courses/{course_id}")
def update_course(course_id: int, updated_course: Course):
    for i, course in enumerate(courses):
        if course.id == course_id:
            courses[i] = updated_course
            return updated_course
    raise HTTPException(status_code=404, detail="Course not found")

# DELETE course
@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    for course in courses:
        if course.id == course_id:
            courses.remove(course)
            return {"message": "Course deleted"}
    raise HTTPException(status_code=404, detail="Course not found")