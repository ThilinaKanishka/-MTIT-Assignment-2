const express = require("express");
const router = express.Router();

const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../data/students");

const allowedStatuses = ["active", "pending", "inactive", "graduated"];
const allowedGenders = [
  "male",
  "female",
  "non-binary",
  "other",
  "prefer-not-to-say",
];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Basic payload validation to keep the sample consistent
function validateStudent(req, res, next) {
  const {
    name,
    email,
    enrollmentStatus,
    year,
    gender,
    dateOfBirth,
    phoneNumber,
    address,
  } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate) {
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }
  } else {
    const hasUpdatableField = [
      "name",
      "email",
      "departmentId",
      "enrollmentStatus",
      "year",
      "gender",
      "dateOfBirth",
      "phoneNumber",
      "address",
    ].some((field) => req.body[field] !== undefined);
    if (!hasUpdatableField) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
  }

  if (email !== undefined && !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (enrollmentStatus && !allowedStatuses.includes(enrollmentStatus)) {
    return res.status(400).json({ message: "Invalid enrollmentStatus" });
  }

  if (
    year !== undefined &&
    (!Number.isInteger(Number(year)) || Number(year) <= 0)
  ) {
    return res.status(400).json({ message: "year must be a positive integer" });
  }

  if (gender !== undefined && !allowedGenders.includes(gender)) {
    return res.status(400).json({ message: "Invalid gender value" });
  }

  if (dateOfBirth !== undefined) {
    const timestamp = Date.parse(dateOfBirth);
    if (Number.isNaN(timestamp)) {
      return res
        .status(400)
        .json({ message: "dateOfBirth must be a valid date" });
    }
  }

  if (
    phoneNumber !== undefined &&
    !/^[+]?[- 0-9]{7,20}$/.test(String(phoneNumber))
  ) {
    return res
      .status(400)
      .json({
        message: "phoneNumber must contain digits and optional +, -, or spaces",
      });
  }

  if (address !== undefined && String(address).trim().length < 3) {
    return res
      .status(400)
      .json({ message: "address must be at least 3 characters" });
  }

  return next();
}

router.get("/", (req, res) => {
  res.json(getAll());
});

router.get("/:id", (req, res) => {
  const student = findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

router.get("/:id/enrollment", (req, res) => {
  const student = findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json({ id: student.id, enrollmentStatus: student.enrollmentStatus });
});

router.post("/", validateStudent, (req, res) => {
  const student = create(req.body);
  res.status(201).json(student);
});

router.put("/:id", validateStudent, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(204).send();
});

module.exports = router;
