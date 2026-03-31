const express = require("express");
const router = express.Router();

const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../data/attendance");

const requiredFields = ["lecturerId", "name", "moduleId", "date", "timeIn"];

function isValidDate(value) {
  return !Number.isNaN(Date.parse(value));
}

function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function validateAttendance(req, res, next) {
  const { lecturerId, name, moduleId, date, timeIn, timeOut } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate) {
    const missing = requiredFields.filter((field) => !req.body[field]);
    if (missing.length) {
      return res
        .status(400)
        .json({ message: `Missing fields: ${missing.join(", ")}` });
    }
  } else {
    const hasUpdatableField = [
      "lecturerId",
      "name",
      "moduleId",
      "date",
      "timeIn",
      "timeOut",
    ].some((field) => req.body[field] !== undefined);
    if (!hasUpdatableField) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
  }

  if (date !== undefined && !isValidDate(date)) {
    return res.status(400).json({ message: "date must be a valid date" });
  }

  if (timeIn !== undefined && !isValidTime(timeIn)) {
    return res
      .status(400)
      .json({ message: "timeIn must be in HH:MM (24h) format" });
  }

  if (
    timeOut !== undefined &&
    timeOut !== null &&
    timeOut !== "" &&
    !isValidTime(timeOut)
  ) {
    return res
      .status(400)
      .json({ message: "timeOut must be in HH:MM (24h) format" });
  }

  return next();
}

router.get("/", (req, res) => {
  res.json(getAll());
});

router.get("/:id", (req, res) => {
  const record = findById(req.params.id);
  if (!record) {
    return res.status(404).json({ message: "Attendance record not found" });
  }
  res.json(record);
});

router.post("/", validateAttendance, (req, res) => {
  const record = create(req.body);
  res.status(201).json(record);
});

router.put("/:id", validateAttendance, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Attendance record not found" });
  }
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Attendance record not found" });
  }
  res.status(204).send();
});

module.exports = router;
