const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const analyzeRisk = require("../utils/riskAnalyzer");
const resolveRedirects = require("../utils/redirectResolver");
const isValidHttpUrl = require("../utils/urlValidator");
const { getCached, setCache } = require("../utils/cache");

const apiKeyAuth = require("../middleware/apiKeyAuth");

const router = express.Router();

/**
 * @swagger
 * /expand:
 *   post:
 *     summary: Expand a shortened or redirected URL
 *     tags: [URL Expansion]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://bit.ly/demo
 *     responses:
 *       200:
 *         description: Expanded URL details
 *       400:
 *         description: Invalid URL
 *       401:
 *         description: Missing API key
 *       403:
 *         description: Invalid API key
 */
router.post("/", apiKeyAuth, async (req, res) => {
    const { url } = req.body;

    if (!url || !isValidHttpUrl(url)) {
        return res.status(400).json({ error: "Invalid or unsafe URL" });
    }

    // Cache check
    const cached = getCached(url);
    if (cached) {
        return res.json({ ...cached, cached: true });
    }

    try {
        const { finalUrl, redirects } = await resolveRedirects(url);

        const finalResponse = await axios.get(finalUrl, {
            responseType: "text",
            maxContentLength: 1024 * 1024
        });

        const contentType = finalResponse.headers["content-type"] || "";
        if (!contentType.includes("text/html")) {
            throw new Error("Final URL is not HTML");
        }

        const $ = cheerio.load(finalResponse.data);

        const faviconHref = $('link[rel="icon"]').attr("href");
        const favicon = faviconHref
            ? new URL(faviconHref, finalUrl).href
            : `${new URL(finalUrl).origin}/favicon.ico`;

        const metadata = {
            title: $("title").text() || null,
            description: $('meta[name="description"]').attr("content") || null,
            favicon
        };

        const { warnings, riskScore } = analyzeRisk(redirects);

        const result = {
            originalUrl: url,
            finalUrl,
            redirects,
            metadata,
            riskScore,
            warnings
        };

        setCache(url, result);

        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to expand URL" });
    }
});

module.exports = router;
