const express = require("express");
const router = express.Router();

const { getAll, findById, create, update, remove } = require("../data/courses");

function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

function validateCourse(req, res, next) {
  const { courseName, courseCode, credits, lecturerId } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate) {
    if (!courseName || !courseCode || credits === undefined || !lecturerId) {
      return res
        .status(400)
        .json({
          message: "courseName, courseCode, credits, lecturerId are required",
        });
    }
  } else {
    const hasUpdatableField = [
      "courseName",
      "courseCode",
      "credits",
      "lecturerId",
    ].some((field) => req.body[field] !== undefined);
    if (!hasUpdatableField) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
  }

  if (credits !== undefined && !isPositiveInteger(credits)) {
    return res
      .status(400)
      .json({ message: "credits must be a positive integer" });
  }

  return next();
}

router.get("/", (req, res) => {
  res.json(getAll());
});

router.get("/:id", (req, res) => {
  const course = findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
});

router.post("/", validateCourse, (req, res) => {
  const course = create(req.body);
  res.status(201).json(course);
});

router.put("/:id", validateCourse, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(204).send();
});

module.exports = router;
