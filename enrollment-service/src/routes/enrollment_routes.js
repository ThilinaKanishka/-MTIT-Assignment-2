const express = require('express');
const Enrollment = require('../models/enrollment_model');

const router = express.Router();

/**
 * @swagger
 * /enrollments:
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
router.post('/', async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // Validate required fields
    if (!student_id || !course_id) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Both student_id and course_id are required"
      });
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      where: { student_id, course_id }
    });

    if (existingEnrollment) {
      return res.status(409).json({
        error: "Duplicate enrollment",
        message: `Student ${student_id} is already enrolled in course ${course_id}`,
        existing_enrollment: existingEnrollment.toJSON()
      });
    }

    const newEnroll = await Enrollment.create({ student_id, course_id });
    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment: newEnroll.toJSON()
    });
  } catch (error) {
    // Handle Sequelize unique constraint error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: "Duplicate enrollment",
        message: "This student is already enrolled in this course"
      });
    }

    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get All Enrollments
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments.map(e => e.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
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
router.get('/:id', async (req, res) => {
  try {
    const enroll = await Enrollment.findByPk(req.params.id);
    if (!enroll) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(enroll.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
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
router.put('/:id', async (req, res) => {
  try {
    const enroll = await Enrollment.findByPk(req.params.id);
    if (!enroll) {
      return res.status(404).json({ error: "Not found" });
    }
    
    // Store the before state
    const before = enroll.toJSON();
    
    // Only update fields that are explicitly provided in request body
    if ('student_id' in req.body) {
      enroll.student_id = req.body.student_id;
    }
    if ('course_id' in req.body) {
      enroll.course_id = req.body.course_id;
    }
    
    await enroll.save();
    
    // Reload from database to ensure consistency
    const updated = await Enrollment.findByPk(req.params.id);
    const after = updated.toJSON();
    
    // Return before and after states
    res.json({
      message: "Enrollment updated successfully",
      before: before,
      after: after
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
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
router.delete('/:id', async (req, res) => {
  try {
    const enroll = await Enrollment.findByPk(req.params.id);
    if (!enroll) {
      return res.status(404).json({ error: "Not found" });
    }
    await enroll.destroy();
    res.json({
      message: "Enrollment deleted successfully",
      deleted_id: req.params.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;