const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./src/docs/swagger");
const attendanceRoutes = require("./src/routes/attendance");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "attendance-service" });
});

// Redirect root to Swagger UI for convenience during development/testing
app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use("/api/attendance", attendanceRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Attendance service listening on port ${PORT}`);
});

module.exports = app;
