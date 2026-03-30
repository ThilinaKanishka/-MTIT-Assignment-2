const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "Course Management API",
    description:
      "Microservice for creating, updating, and listing university courses.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Local course service",
    },
  ],
  tags: [{ name: "Courses", description: "Course catalogue management" }],
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
        },
      },
    },
  },
  components: {
    schemas: {
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
    },
  },
};

module.exports = swaggerDocument;
