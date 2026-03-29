const { randomUUID } = require("crypto");

const students = [
  {
    id: randomUUID(),
    name: "Ama Perera",
    email: "ama.perera@example.edu",
    departmentId: "DEP-IT",
    enrollmentStatus: "active",
    year: 2,
  },
  {
    id: randomUUID(),
    name: "Ravi Jayasuriya",
    email: "ravi.jaya@example.edu",
    departmentId: "DEP-BIZ",
    enrollmentStatus: "pending",
    year: 1,
  },
];

const allowedFields = [
  "name",
  "email",
  "departmentId",
  "enrollmentStatus",
  "year",
];

function getAll() {
  return students;
}

function findById(id) {
  return students.find((student) => student.id === id);
}

function create(payload) {
  const student = {
    id: randomUUID(),
    name: payload.name,
    email: payload.email,
    departmentId: payload.departmentId || null,
    enrollmentStatus: payload.enrollmentStatus || "pending",
    year: Number(payload.year) || 1,
  };
  students.push(student);
  return student;
}

function update(id, payload) {
  const student = findById(id);
  if (!student) {
    return null;
  }

  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key] !== undefined) {
      student[key] = key === "year" ? Number(payload[key]) : payload[key];
    }
  });

  return student;
}

function remove(id) {
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    return false;
  }
  students.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
