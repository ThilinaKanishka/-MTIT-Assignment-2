const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     LecturerAttendance:
 *       type: object
 *       required:
 *         - lecturerId
 *         - name
 *         - moduleId
 *         - date
 *         - timeIn
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         lecturerId:
 *           type: string
 *           description: Unique identifier of the lecturer
 *           example: LEC001
 *         name:
 *           type: string
 *           description: Full name of the lecturer
 *           example: Dr. John Smith
 *         moduleId:
 *           type: string
 *           description: Module/course identifier
 *           example: IT4020
 *         date:
 *           type: string
 *           format: date
 *           description: Date of attendance (YYYY-MM-DD)
 *           example: "2026-03-30"
 *         timeIn:
 *           type: string
 *           description: Time the lecturer checked in (HH:MM)
 *           example: "08:30"
 *         timeOut:
 *           type: string
 *           description: Time the lecturer checked out (HH:MM)
 *           example: "10:30"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const LecturerAttendanceSchema = new mongoose.Schema(
    {
        lecturerId: {
            type: String,
            required: [true, 'Lecturer ID is required'],
            trim: true,
        },
        name: {
            type: String,
            required: [true, 'Lecturer name is required'],
            trim: true,
        },
        moduleId: {
            type: String,
            required: [true, 'Module ID is required'],
            trim: true,
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        timeIn: {
            type: String,
            required: [true, 'Time-in is required'],
        },
        timeOut: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('LecturerAttendance', LecturerAttendanceSchema);
