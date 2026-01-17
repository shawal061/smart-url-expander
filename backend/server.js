const express = require("express");
const cors = require("cors");

const rateLimiter = require("./middleware/rateLimit");
const expandRoute = require("./routes/expand");

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// API versioning
app.use("/api/v1/expand", expandRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
