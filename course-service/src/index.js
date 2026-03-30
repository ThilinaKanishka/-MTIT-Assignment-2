const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./docs/swagger");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "course-service" });
});

app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use("/api/courses", courseRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Course service listening on port ${port}`);
});

module.exports = app;
