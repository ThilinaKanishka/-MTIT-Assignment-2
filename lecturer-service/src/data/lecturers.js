const { randomUUID } = require("crypto");

let lecturers = [
  {
    id: "LEC-001",
    name: "Dr. Aruna Silva",
    email: "aruna.silva@example.edu",
    departmentId: "DEP-IT",
    specialization: "Machine Learning",
    officeLocation: "Block A, Room 402"
  },
  {
    id: "LEC-002",
    name: "Prof. Nimal Perera",
    email: "nimal.perera@example.edu",
    departmentId: "DEP-CS",
    specialization: "Distributed Systems",
    officeLocation: "Block B, Room 211"
  },
  {
    id: "LEC-003",
    name: "Dr. Sana Fernando",
    email: "sana.fernando@example.edu",
    departmentId: "DEP-SE",
    specialization: "Software Architecture",
    officeLocation: "Block C, Room 105"
  }
];

const allowedFields = [
  "name",
  "email",
  "departmentId",
  "specialization",
  "officeLocation"
];

function getAll() {
  return lecturers;
}

function findById(id) {
  return lecturers.find((l) => l.id === id);
}

function create(payload) {
  const lecturer = {
    id: randomUUID(),
    name: payload.name,
    email: payload.email,
    departmentId: payload.departmentId || null,
    specialization: payload.specialization || null,
    officeLocation: payload.officeLocation || null
  };
  lecturers.push(lecturer);
  return lecturer;
}

function update(id, payload) {
  const lecturer = findById(id);
  if (!lecturer) return null;

  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key] !== undefined) {
      lecturer[key] = payload[key];
    }
  });

  return lecturer;
}

function remove(id) {
  const index = lecturers.findIndex((l) => l.id === id);
  if (index === -1) return false;
  lecturers.splice(index, 1);
  return true;
}

module.exports = { getAll, findById, create, update, remove };