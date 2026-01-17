const express = require("express");
const cors = require("cors");

const rateLimiter = require("./middleware/rateLimit");
const expandRoute = require("./routes/expand");

const app = express();

app.use(cors());
app.use(express.json());

// Public API (v1)
app.use("/api/v1/expand", rateLimiter, expandRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Public API running on http://localhost:${PORT}`);
});
