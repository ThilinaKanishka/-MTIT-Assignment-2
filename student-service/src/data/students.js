const { randomUUID } = require("crypto");

const students = [
  {
    id: randomUUID(),
    name: "Ama Perera",
    email: "ama.perera@example.edu",
    departmentId: "DEP-IT",
    enrollmentStatus: "active",
    year: 2,
    gender: "female",
    dateOfBirth: "2002-03-14",
    phoneNumber: "+94 71 123 4567",
    address: "123 Flower Rd, Colombo",
  },
  {
    id: randomUUID(),
    name: "Ravi Jayasuriya",
    email: "ravi.jaya@example.edu",
    departmentId: "DEP-BIZ",
    enrollmentStatus: "pending",
    year: 1,
    gender: "male",
    dateOfBirth: "2004-11-02",
    phoneNumber: "+94 77 234 5678",
    address: "45 Lake Rd, Kandy",
  },
  {
    id: randomUUID(),
    name: "Thilina Hettiarachchi",
    email: "Thilina@example.edu",
    departmentId: "DEP-BIZ",
    enrollmentStatus: "Active",
    year: 4,
    gender: "male",
    dateOfBirth: "2000-07-22",
    phoneNumber: "+94 76 987 6543",
    address: "10 Beach Ave, Galle",
  },
];

const allowedFields = [
  "name",
  "email",
  "departmentId",
  "enrollmentStatus",
  "year",
  "gender",
  "dateOfBirth",
  "phoneNumber",
  "address",
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
    gender: payload.gender || null,
    dateOfBirth: payload.dateOfBirth || null,
    phoneNumber: payload.phoneNumber || null,
    address: payload.address || null,
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
