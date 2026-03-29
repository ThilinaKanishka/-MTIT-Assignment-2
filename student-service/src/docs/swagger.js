const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'Student Management API',
    description: 'Microservice for student registration, details, and enrollment status.',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local student service'
    }
  ],
  tags: [
    { name: 'Students', description: 'Student records and enrollment status' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        responses: {
          200: { description: 'Service is healthy' }
        }
      }
    },
    '/api/students': {
      get: {
        tags: ['Students'],
        summary: 'List all students',
        responses: {
          200: {
            description: 'Student list',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Student' } }
              }
            }
          }
        }
      },
      post: {
        tags: ['Students'],
        summary: 'Create a new student',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Created student',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Student' }
              }
            }
          },
          400: { description: 'Invalid payload' }
        }
      }
    },
    '/api/students/{id}': {
      get: {
        tags: ['Students'],
        summary: 'Get a student by id',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: {
            description: 'Student found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Student' } } }
          },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Students'],
        summary: 'Update an existing student',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/StudentUpdate' } }
          }
        },
        responses: {
          200: {
            description: 'Updated student',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Student' } } }
          },
          400: { description: 'Invalid payload' },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Students'],
        summary: 'Remove a student',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          204: { description: 'Deleted' },
          404: { description: 'Not found' }
        }
      }
    },
    '/api/students/{id}/enrollment': {
      get: {
        tags: ['Students'],
        summary: 'Get enrollment status for a student',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: {
            description: 'Enrollment status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    enrollmentStatus: { type: 'string' }
                  }
                }
              }
            }
          },
          404: { description: 'Not found' }
        }
      }
    }
  },
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          departmentId: { type: 'string', nullable: true },
          enrollmentStatus: { type: 'string', enum: ['active', 'pending', 'inactive', 'graduated'] },
          year: { type: 'integer', minimum: 1 }
        }
      },
      StudentInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          departmentId: { type: 'string' },
          enrollmentStatus: { type: 'string', enum: ['active', 'pending', 'inactive', 'graduated'] },
          year: { type: 'integer', minimum: 1, default: 1 }
        }
      },
      StudentUpdate: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          departmentId: { type: 'string' },
          enrollmentStatus: { type: 'string', enum: ['active', 'pending', 'inactive', 'graduated'] },
          year: { type: 'integer', minimum: 1 }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
