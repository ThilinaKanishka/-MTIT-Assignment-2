const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./database/db");
const enrollmentRoutes = require("./routes/enrollment_routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Enrollment Service API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "enrollment-service" });
});

// Root endpoint - redirect to docs
app.get("/", (req, res) => {
  res.redirect("/docs");
});

// Enrollment routes
app.use("/api/enrollments", enrollmentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`Enrollment Service running on port ${port}`);
});
