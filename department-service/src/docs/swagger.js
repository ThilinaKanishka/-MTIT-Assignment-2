const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "Department Management API",
    description:
      "Microservice for creating, updating, and listing university departments.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3005",
      description: "Local department service",
    },
  ],
  tags: [{ name: "Departments", description: "Department management" }],
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
    "/api/departments": {
      get: {
        tags: ["Departments"],
        summary: "List all departments",
        responses: {
          200: {
            description: "Department list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Department" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Departments"],
        summary: "Create a new department",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DepartmentInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created department",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Department" },
              },
            },
          },
          400: { description: "Invalid payload" },
        },
      },
    },
    "/api/departments/{id}": {
      get: {
        tags: ["Departments"],
        summary: "Get a department by id",
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
            description: "Department found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Department" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
      put: {
        tags: ["Departments"],
        summary: "Update an existing department",
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
              schema: {
                $ref: "#/components/schemas/DepartmentUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated department",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Department" },
              },
            },
          },
          400: { description: "Invalid payload" },
          404: { description: "Not found" },
        },
      },
      delete: {
        tags: ["Departments"],
        summary: "Delete a department by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Deleted successfully" },
          404: { description: "Not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Department: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique department identifier (UUID)",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          department_name: {
            type: "string",
            description: "Name of the department",
            example: "Information Technology",
          },
          head_of_department: {
            type: "string",
            description: "Name of the department head",
            example: "Dr. James Wilson",
          },
        },
        required: ["id", "department_name", "head_of_department"],
      },
      DepartmentInput: {
        type: "object",
        properties: {
          department_name: {
            type: "string",
            description: "Name of the department",
            example: "Computer Science",
          },
          head_of_department: {
            type: "string",
            description: "Name of the department head",
            example: "Prof. Emily Davis",
          },
        },
        required: ["department_name", "head_of_department"],
      },
      DepartmentUpdate: {
        type: "object",
        properties: {
          department_name: {
            type: "string",
            description: "Name of the department",
            example: "Computer Science Division",
          },
          head_of_department: {
            type: "string",
            description: "Name of the department head",
            example: "Dr. Robert Smith",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
