const { randomUUID } = require("crypto");

const records = [
  {
    id: "ATT-001",
    lecturerId: "LEC-001",
    name: "Dr. John Smith",
    moduleId: "IT4020",
    date: "2026-03-30",
    timeIn: "08:30",
    timeOut: "10:15",
  },
  {
    id: "ATT-002",
    lecturerId: "LEC-002",
    name: "Prof. Ayesha Perera",
    moduleId: "CS3050",
    date: "2026-03-29",
    timeIn: "09:00",
    timeOut: "11:30",
  },
];

function getAll() {
  return records;
}

function findById(id) {
  return records.find((record) => record.id === id);
}

function create(payload) {
  const record = {
    id: randomUUID(),
    lecturerId: payload.lecturerId,
    name: payload.name,
    moduleId: payload.moduleId,
    date: payload.date,
    timeIn: payload.timeIn,
    timeOut: payload.timeOut ?? null,
  };
  records.push(record);
  return record;
}

function update(id, payload) {
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return null;

  records[index] = {
    ...records[index],
    ...payload,
  };
  return records[index];
}

function remove(id) {
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return false;
  records.splice(index, 1);
  return true;
}

module.exports = { getAll, findById, create, update, remove };
