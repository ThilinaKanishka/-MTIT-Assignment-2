const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "Lecturer Management API",
    description: "Microservice for lecturer profiles and academic specializations.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3008",
      description: "Local Lecturer Service",
    },
  ],
  tags: [
    { name: "Lecturers", description: "Lecturer management" },
  ],
  paths: {
    "/api/lecturers": {
      get: {
        tags: ["Lecturers"],
        summary: "List all lecturers",
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Lecturer" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Lecturers"],
        summary: "Add a new lecturer",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/LecturerInput" } },
          },
        },
        responses: {
          201: { description: "Created" },
          400: { description: "Invalid payload" },
        },
      },
    },
    "/api/lecturers/{id}": {
      get: {
        tags: ["Lecturers"],
        summary: "Get lecturer by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: {
            description: "Found",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Lecturer" } } },
          },
          404: { description: "Not found" },
        },
      },
      put: {
        tags: ["Lecturers"],
        summary: "Update lecturer",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LecturerUpdate" } } },
        },
        responses: {
          200: { description: "Updated" },
          404: { description: "Not found" },
        },
      },
      delete: {
        tags: ["Lecturers"],
        summary: "Delete lecturer",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          204: { description: "Deleted" },
          404: { description: "Not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Lecturer: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          departmentId: { type: "string" },
          specialization: { type: "string" },
          officeLocation: { type: "string" },
        },
      },
      LecturerInput: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          departmentId: { type: "string" },
          specialization: { type: "string" },
          officeLocation: { type: "string" },
        },
      },
      LecturerUpdate: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          departmentId: { type: "string" },
          specialization: { type: "string" },
          officeLocation: { type: "string" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;