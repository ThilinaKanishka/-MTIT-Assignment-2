const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "University Management System - API Gateway",
    description: `
Centralized API Gateway for all University Management microservices.

This gateway consolidates access to:
- Student Service (Available)
- Course Service (Available)
- Lecturer  Service (Coming Soon)
- Enrollment Service (Coming Soon)
- Department  Service (Coming Soon)
- Attendance  Service (Available)

All services are accessible through a single port (3000).
    `,
    version: "1.0.0",
    contact: {
      name: "MTIT Assignment 2",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Students", description: "Student records and enrollment status" },
    { name: "Courses", description: "Course catalogue management" },
    { name: "Attendance", description: "Lecturer attendance records" },
    { name: "System", description: "Health check and system endpoints" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["System"],
        summary: "Gateway health check",
        responses: {
          200: {
            description: "Gateway is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    service: { type: "string", example: "api-gateway" },
                    timestamp: { type: "string", format: "date-time" },
                    availableServices: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          path: { type: "string" },
                          target: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/students": {
      get: {
        tags: ["Students"],
        summary: "List all students",
        responses: {
          200: {
            description: "Student list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Student" },
                },
              },
            },
          },
          503: { description: "Student service unavailable" },
        },
      },
      post: {
        tags: ["Students"],
        summary: "Create a new student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StudentInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created student",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" },
              },
            },
          },
          400: { description: "Invalid payload" },
          503: { description: "Student service unavailable" },
        },
      },
    },
    "/api/students/{id}": {
      get: {
        tags: ["Students"],
        summary: "Get a student by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Student found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" },
              },
            },
          },
          404: { description: "Not found" },
          503: { description: "Student service unavailable" },
        },
      },
      put: {
        tags: ["Students"],
        summary: "Update an existing student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StudentUpdate" },
            },
          },
        },
        responses: {
          200: {
            description: "Updated student",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" },
              },
            },
          },
          400: { description: "Invalid payload" },
          404: { description: "Not found" },
          503: { description: "Student service unavailable" },
        },
      },
      delete: {
        tags: ["Students"],
        summary: "Remove a student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Deleted" },
          404: { description: "Not found" },
          503: { description: "Student service unavailable" },
        },
      },
    },
    "/api/students/{id}/enrollment": {
      get: {
        tags: ["Students"],
        summary: "Get enrollment status for a student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Enrollment status",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    enrollmentStatus: { type: "string" },
                  },
                },
              },
            },
          },
          404: { description: "Not found" },
          503: { description: "Student service unavailable" },
        },
      },
    },
    "/api/courses": {
      get: {
        tags: ["Courses"],
        summary: "List all courses",
        responses: {
          200: {
            description: "Course list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Course" },
                },
              },
            },
          },
          503: { description: "Course service unavailable" },
        },
      },
      post: {
        tags: ["Courses"],
        summary: "Create a new course",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CourseInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created course",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          400: { description: "Invalid payload" },
          503: { description: "Course service unavailable" },
        },
      },
    },
    "/api/courses/{id}": {
      get: {
        tags: ["Courses"],
        summary: "Get a course by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Course found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          404: { description: "Not found" },
          503: { description: "Course service unavailable" },
        },
      },
      put: {
        tags: ["Courses"],
        summary: "Update an existing course",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CourseUpdate" },
            },
          },
        },
        responses: {
          200: {
            description: "Updated course",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          400: { description: "Invalid payload" },
          404: { description: "Not found" },
          503: { description: "Course service unavailable" },
        },
      },
      delete: {
        tags: ["Courses"],
        summary: "Remove a course",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Deleted" },
          404: { description: "Not found" },
          503: { description: "Course service unavailable" },
        },
      },
    },
    "/api/attendance": {
      get: {
        tags: ["Attendance"],
        summary: "List all attendance records",
        responses: {
          200: {
            description: "Attendance list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Attendance" },
                },
              },
            },
          },
          503: { description: "Attendance service unavailable" },
        },
      },
      post: {
        tags: ["Attendance"],
        summary: "Create a new attendance record",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AttendanceInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created attendance record",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Attendance" },
              },
            },
          },
          400: { description: "Invalid payload" },
          503: { description: "Attendance service unavailable" },
        },
      },
    },
    "/api/attendance/{id}": {
      get: {
        tags: ["Attendance"],
        summary: "Get attendance by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Attendance found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Attendance" },
              },
            },
          },
          404: { description: "Not found" },
          503: { description: "Attendance service unavailable" },
        },
      },
      put: {
        tags: ["Attendance"],
        summary: "Update attendance",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AttendanceUpdate" },
            },
          },
        },
        responses: {
          200: {
            description: "Updated attendance",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Attendance" },
              },
            },
          },
          400: { description: "Invalid payload" },
          404: { description: "Not found" },
          503: { description: "Attendance service unavailable" },
        },
      },
      delete: {
        tags: ["Attendance"],
        summary: "Delete attendance",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Deleted" },
          404: { description: "Not found" },
          503: { description: "Attendance service unavailable" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key",
      },
    },
    schemas: {
      Student: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          departmentId: { type: "string", nullable: true },
          enrollmentStatus: {
            type: "string",
            enum: ["active", "pending", "inactive", "graduated"],
          },
          year: { type: "integer", minimum: 1 },
        },
      },
      StudentInput: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          departmentId: { type: "string" },
          enrollmentStatus: {
            type: "string",
            enum: ["active", "pending", "inactive", "graduated"],
          },
          year: { type: "integer", minimum: 1, default: 1 },
        },
      },
      StudentUpdate: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          departmentId: { type: "string" },
          enrollmentStatus: {
            type: "string",
            enum: ["active", "pending", "inactive", "graduated"],
          },
          year: { type: "integer", minimum: 1 },
        },
      },
      Course: {
        type: "object",
        properties: {
          id: { type: "string" },
          courseName: { type: "string" },
          courseCode: { type: "string" },
          credits: { type: "integer", minimum: 1 },
          lecturerId: { type: "string" },
        },
      },
      CourseInput: {
        type: "object",
        required: ["courseName", "courseCode", "credits", "lecturerId"],
        properties: {
          courseName: { type: "string" },
          courseCode: { type: "string" },
          credits: { type: "integer", minimum: 1 },
          lecturerId: { type: "string" },
        },
      },
      CourseUpdate: {
        type: "object",
        properties: {
          courseName: { type: "string" },
          courseCode: { type: "string" },
          credits: { type: "integer", minimum: 1 },
          lecturerId: { type: "string" },
        },
      },
      Attendance: {
        type: "object",
        properties: {
          id: { type: "string" },
          lecturerId: { type: "string" },
          name: { type: "string" },
          moduleId: { type: "string" },
          date: { type: "string", format: "date" },
          timeIn: { type: "string", example: "09:00" },
          timeOut: { type: "string", nullable: true, example: "16:00" },
        },
      },
      AttendanceInput: {
        type: "object",
        required: ["lecturerId", "name", "moduleId", "date", "timeIn"],
        properties: {
          lecturerId: { type: "string" },
          name: { type: "string" },
          moduleId: { type: "string" },
          date: { type: "string", format: "date" },
          timeIn: { type: "string", example: "09:00" },
          timeOut: { type: "string", nullable: true, example: "16:00" },
        },
      },
      AttendanceUpdate: {
        type: "object",
        properties: {
          lecturerId: { type: "string" },
          name: { type: "string" },
          moduleId: { type: "string" },
          date: { type: "string", format: "date" },
          timeIn: { type: "string", example: "09:00" },
          timeOut: { type: "string", nullable: true, example: "16:00" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          status: {
            type: "integer",
          },
          timestamp: {
            type: "string",
            format: "date-time",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
