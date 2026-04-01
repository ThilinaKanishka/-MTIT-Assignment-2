const LecturerAttendance = require('../models/LecturerAttendance');

// ─── CREATE ───────────────────────────────────────────────────────────────────

/**
 * @desc   Create a new lecturer attendance record
 * @route  POST /attendance
 * @access Public
 */
const createAttendance = async (req, res) => {
    try {
        const record = new LecturerAttendance(req.body);
        const saved = await record.save();
        res.status(201).json(saved);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

// ─── READ ALL ─────────────────────────────────────────────────────────────────

/**
 * @desc   Retrieve all lecturer attendance records
 * @route  GET /attendance
 * @access Public
 */
const getAllAttendance = async (req, res) => {
    try {
        const records = await LecturerAttendance.find().sort({ date: -1 });
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─── READ BY ID ───────────────────────────────────────────────────────────────

/**
 * @desc   Retrieve a single attendance record by ID
 * @route  GET /attendance/:id
 * @access Public
 */
const getAttendanceById = async (req, res) => {
    try {
        const record = await LecturerAttendance.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────

/**
 * @desc   Update an existing attendance record
 * @route  PUT /attendance/:id
 * @access Public
 */
const updateAttendance = async (req, res) => {
    try {
        const record = await LecturerAttendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!record) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.status(200).json(record);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

/**
 * @desc   Delete an attendance record by ID
 * @route  DELETE /attendance/:id
 * @access Public
 */
const deleteAttendance = async (req, res) => {
    try {
        const record = await LecturerAttendance.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};
