const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./database/db');
const enrollmentRoutes = require('./routes/enrollment_routes');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Enrollment Service API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'enrollment-service' });
});

// Root endpoint - redirect to docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Enrollment routes
app.use('/enrollments', enrollmentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

app.listen(3008, () => {
  console.log('Enrollment Service running on port 3008');
});