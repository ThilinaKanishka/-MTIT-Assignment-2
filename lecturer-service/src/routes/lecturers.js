const express = require("express");
const router = express.Router();
const { getAll, findById, create, update, remove } = require("../data/lecturers");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateLecturer(req, res, next) {
  const { name, email, officeLocation } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate && (!name || !email)) {
    return res.status(400).json({ message: "name and email are required" });
  }

  if (email !== undefined && !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (officeLocation && officeLocation.length < 3) {
    return res.status(400).json({ message: "officeLocation too short" });
  }

  next();
}

router.get("/", (req, res) => res.json(getAll()));

router.get("/:id", (req, res) => {
  const lecturer = findById(req.params.id);
  if (!lecturer) return res.status(404).json({ message: "Lecturer not found" });
  res.json(lecturer);
});

router.post("/", validateLecturer, (req, res) => {
  const lecturer = create(req.body);
  res.status(201).json(lecturer);
});

router.put("/:id", validateLecturer, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Lecturer not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) return res.status(404).json({ message: "Lecturer not found" });
  res.status(204).send();
});

module.exports = router;