const express = require("express");
const apiKeys = require("../config/apiKeys");
const generateApiKey = require("../utils/keyGenerator");

const router = express.Router();

/**
 * @swagger
 * /keys:
 *   post:
 *     summary: Generate a new API key
 *     tags: [API Keys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: string
 *                 example: free
 *     responses:
 *       201:
 *         description: API key generated
 */
router.post("/", (req, res) => {
    const { plan = "free" } = req.body;

    const limits = {
        free: 100,
        pro: 1000,
        enterprise: 10000
    };

    if (!limits[plan]) {
        return res.status(400).json({ error: "Invalid plan" });
    }

    const apiKey = generateApiKey();

    apiKeys.set(apiKey, {
        plan,
        limit: limits[plan],
        createdAt: new Date().toISOString()
    });

    res.status(201).json({
        apiKey,
        plan,
        limit: limits[plan]
    });
});

module.exports = router;