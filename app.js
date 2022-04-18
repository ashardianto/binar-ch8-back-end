const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./server/routes");
const errorHandler = require("./server/middlewares/errorHandler");

// SETUP YAML
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./api.yaml");

const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

/**
 * @Routes /api
 * entrypoint for all API routes
 */
app.use("/api", apiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
