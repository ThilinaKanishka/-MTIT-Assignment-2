const express = require("express");
const router = express.Router();

const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../data/departments");

/**
 * Validation middleware for department data
 * Ensures required fields are present for CREATE
 * Ensures at least one updatable field is provided for UPDATE
 */
function validateDepartment(req, res, next) {
  const { department_name, head_of_department } = req.body;
  const isCreate = req.method === "POST";

  if (isCreate) {
    // CREATE requires both fields
    if (!department_name || !head_of_department) {
      return res
        .status(400)
        .json({
          message: "department_name and head_of_department are required",
        });
    }
  } else {
    // UPDATE requires at least one field
    const hasUpdatableField = [
      "department_name",
      "head_of_department",
    ].some((field) => req.body[field] !== undefined);
    if (!hasUpdatableField) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
  }

  return next();
}

/**
 * GET /api/departments
 * Retrieve all departments
 */
router.get("/", (req, res) => {
  res.json(getAll());
});

/**
 * GET /api/departments/:id
 * Retrieve a single department by ID
 */
router.get("/:id", (req, res) => {
  const department = findById(req.params.id);
  if (!department) {
    return res.status(404).json({ message: "Department not found" });
  }
  res.json(department);
});

/**
 * POST /api/departments
 * Create a new department
 * Body: { department_name, head_of_department }
 */
router.post("/", validateDepartment, (req, res) => {
  const department = create(req.body);
  res.status(201).json(department);
});

/**
 * PUT /api/departments/:id
 * Update an existing department
 * Body: { department_name?, head_of_department? }
 */
router.put("/:id", validateDepartment, (req, res) => {
  const updated = update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Department not found" });
  }
  res.json(updated);
});

/**
 * DELETE /api/departments/:id
 * Delete a department by ID
 */
router.delete("/:id", (req, res) => {
  const removed = remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Department not found" });
  }
  res.status(204).send();
});

module.exports = router;
