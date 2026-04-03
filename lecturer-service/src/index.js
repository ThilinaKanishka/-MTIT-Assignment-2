const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./docs/swagger");
const lecturerRoutes = require("./routes/lecturers");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve Swagger UI at /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redirect root to /docs for easy access
app.get("/", (req, res) => res.redirect("/docs"));

// API Routes
app.use("/api/lecturers", lecturerRoutes);

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Lecturer Service UI running at http://localhost:${PORT}/docs`);
});