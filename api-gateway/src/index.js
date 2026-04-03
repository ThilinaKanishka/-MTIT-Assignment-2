const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Service configuration
const services = {
  student: {
    target: "http://localhost:3001",
    pathFilter: "/api/students",
    name: "Student Service",
  },
  course: {
    target: "http://localhost:3002",
    pathFilter: "/api/courses",
    name: "Course Service",
  },
  attendance: {
    target: "http://localhost:3003",
    pathFilter: "/api/attendance",
    name: "Attendance Service",
  },
  department: {
    target: "http://localhost:3005",
    pathFilter: "/api/departments",
    name: "Department Service",
  },
  lecturer: {
    target: "http://localhost:3007",
    pathFilter: "/api/lecturers",
    name: "Lecturer Service",
  },
  enrollment: {
    target: "http://localhost:3008",
    pathFilter: "/api/enrollments",
    name: "Enrollment Service",
  },
};

// Health check endpoint for the gateway
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "api-gateway",
    timestamp: new Date().toISOString(),
    availableServices: Object.keys(services).map((key) => ({
      name: services[key].name,
      path: services[key].pathFilter,
      target: services[key].target,
    })),
  });
});

// Gateway root - redirect to Swagger UI
app.get("/", (req, res) => {
  res.redirect("/docs");
});

// Create proxy middleware for each service
Object.keys(services).forEach((serviceKey) => {
  const service = services[serviceKey];

  app.use(
    service.pathFilter,
    createProxyMiddleware({
      target: service.target,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: undefined,
      onError: (err, req, res) => {
        console.error(`Proxy error for ${service.name}:`, err.message);
        res.status(503).json({
          message: `Service temporarily unavailable: ${service.name}`,
          error: err.message,
          timestamp: new Date().toISOString(),
        });
      },
      onProxyReq: (proxyReq, req, res) => {
        fixRequestBody(proxyReq, req);
        console.log(`[${service.name}] ${req.method} ${req.url}`);
      },
    }),
  );
});

// Swagger UI setup
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "University API Gateway",
  }),
);

// API documentation endpoint (JSON)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    hint: "Visit /docs for available API endpoints",
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Gateway error:", err.stack);
  res.status(500).json({
    message: "Internal gateway error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
    timestamp: new Date().toISOString(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`╔═══════════════════════════════════════════════════════════╗`);
  console.log(`║     University Management System - API Gateway            ║`);
  console.log(`╠═══════════════════════════════════════════════════════════╣`);
  console.log(`║  Gateway running on port: ${port}`);
  console.log(`║  Swagger UI: http://localhost:${port}/docs`);
  console.log(`║  Health Check: http://localhost:${port}/health`);
  console.log(`╠═══════════════════════════════════════════════════════════╣`);
  console.log(`║  Configured Services:`);
  Object.keys(services).forEach((key) => {
    console.log(
      `║    - ${services[key].name.padEnd(25)} ${services[key].target}`,
    );
  });
  console.log(`╚═══════════════════════════════════════════════════════════╝`);
});

module.exports = app;