const express = require("express");

const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../data/enrollments");

const router = express.Router();

function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

function validateEnrollment(req, res, next) {
  const { student_id, course_id } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate) {
    if (student_id === undefined || course_id === undefined) {
      return res
        .status(400)
        .json({ message: "student_id and course_id are required" });
    }
  } else {
    const hasUpdatableField = ["student_id", "course_id"].some(
      (field) => req.body[field] !== undefined,
    );
    if (!hasUpdatableField) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
  }

  if (student_id !== undefined && !isPositiveInteger(student_id)) {
    return res
      .status(400)
      .json({ message: "student_id must be a positive integer" });
  }

  if (course_id !== undefined && !isPositiveInteger(course_id)) {
    return res
      .status(400)
      .json({ message: "course_id must be a positive integer" });
  }

  return next();
}

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Add Enrollment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Enrollment added
 */
router.post("/", validateEnrollment, (req, res) => {
  const { student_id, course_id } = req.body;
  const existingEnrollment = getAll().find(
    (enrollment) =>
      enrollment.student_id === Number(student_id) &&
      enrollment.course_id === Number(course_id),
  );

  if (existingEnrollment) {
    return res.status(409).json({
      message: `Student ${student_id} is already enrolled in course ${course_id}`,
    });
  }

  const enrollment = create({ student_id, course_id });
  res.status(201).json(enrollment);
});

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get All Enrollments
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get("/", (req, res) => {
  res.json(getAll());
});

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get Enrollment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Not found
 */
router.get("/:id", (req, res) => {
  const enrollment = findById(req.params.id);
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }
  res.json(enrollment);
});

/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Update Enrollment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Enrollment updated
 *       404:
 *         description: Not found
 */
router.put("/:id", validateEnrollment, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Enrollment not found" });
  }
  res.json(updated);
});

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete Enrollment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Enrollment deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Enrollment not found" });
  }
  res.status(204).send();
});

module.exports = router;
