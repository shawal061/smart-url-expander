// backend/server.js

const express = require("express");
const cors = require("cors");

const expandRoute = require("./routes/expand");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expand", expandRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
