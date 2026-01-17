const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const rateLimiter = require("./middleware/rateLimit");
const apiKeyAuth = require("./middleware/apiKeyAuth");

const expandRoute = require("./routes/expand");
const keysRoute = require("./routes/keys");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/v1/keys", keysRoute);
app.use("/api/v1/expand", apiKeyAuth, rateLimiter, expandRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`API running at http://localhost:${PORT}`)
);