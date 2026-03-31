const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "Attendance Management API",
    description: "Microservice for recording lecturer attendance.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3005",
      description: "Local attendance service",
    },
  ],
  tags: [{ name: "Attendance", description: "Lecturer attendance records" }],
  paths: {
    "/health": {
      get: {
        tags: ["System"],
        summary: "Health check",
        responses: {
          200: { description: "Service is healthy" },
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
        },
      },
      post: {
        tags: ["Attendance"],
        summary: "Create a new attendance record",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AttendanceInput" },
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
        },
      },
    },
    "/api/attendance/{id}": {
      get: {
        tags: ["Attendance"],
        summary: "Get an attendance record by id",
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
        },
      },
      put: {
        tags: ["Attendance"],
        summary: "Update an attendance record",
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
            description: "Updated attendance record",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Attendance" },
              },
            },
          },
          400: { description: "Invalid payload" },
          404: { description: "Not found" },
        },
      },
      delete: {
        tags: ["Attendance"],
        summary: "Remove an attendance record",
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
        },
      },
    },
  },
  components: {
    schemas: {
      Attendance: {
        type: "object",
        properties: {
          id: { type: "string" },
          lecturerId: { type: "string" },
          name: { type: "string" },
          moduleId: { type: "string" },
          date: { type: "string", format: "date" },
          timeIn: { type: "string", description: "HH:MM 24h format" },
          timeOut: {
            type: "string",
            nullable: true,
            description: "HH:MM 24h format",
          },
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
          timeIn: { type: "string" },
          timeOut: { type: "string" },
        },
      },
      AttendanceUpdate: {
        type: "object",
        properties: {
          lecturerId: { type: "string" },
          name: { type: "string" },
          moduleId: { type: "string" },
          date: { type: "string", format: "date" },
          timeIn: { type: "string" },
          timeOut: { type: "string" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
