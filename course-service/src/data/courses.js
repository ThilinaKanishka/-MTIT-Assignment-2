const { randomUUID } = require("crypto");

const courses = [
  {
    id: randomUUID(),
    courseName: "Introduction to Databases",
    courseCode: "DB101",
    credits: 3,
    lecturerId: "LECT-001",
  },
  {
    id: randomUUID(),
    courseName: "Distributed Systems",
    courseCode: "CS401",
    credits: 4,
    lecturerId: "LECT-002",
  },
];

const allowedFields = ["courseName", "courseCode", "credits", "lecturerId"];

function getAll() {
  return courses;
}

function findById(id) {
  return courses.find((course) => course.id === id);
}

function create(payload) {
  const course = {
    id: randomUUID(),
    courseName: payload.courseName,
    courseCode: payload.courseCode,
    credits: Number(payload.credits),
    lecturerId: payload.lecturerId,
  };
  courses.push(course);
  return course;
}

function update(id, payload) {
  const course = findById(id);
  if (!course) {
    return null;
  }

  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key] !== undefined) {
      course[key] = key === "credits" ? Number(payload[key]) : payload[key];
    }
  });

  return course;
}

function remove(id) {
  const index = courses.findIndex((course) => course.id === id);
  if (index === -1) {
    return false;
  }
  courses.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
