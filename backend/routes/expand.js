// backend/routes/expand.js

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const analyzeRisk = require("../utils/riskAnalyzer");
const resolveRedirects = require("../utils/redirectResolver");

const router = express.Router();

router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Resolve redirects
        const { finalUrl, redirects } = await resolveRedirects(url);

        // Fetch metadata
        const finalResponse = await axios.get(finalUrl);
        const $ = cheerio.load(finalResponse.data);

        const faviconHref = $('link[rel="icon"]').attr("href");
        const favicon = faviconHref
            ? new URL(faviconHref, finalUrl).href
            : `${new URL(finalUrl).origin}/favicon.ico`;

        const metadata = {
            title: $("title").text() || null,
            description: $('meta[name="description"]').attr("content") || null,
            favicon,
        };

        // Risk analysis
        const { warnings, riskScore } = analyzeRisk(redirects);

        res.json({
            originalUrl: url,
            finalUrl,
            redirects,
            metadata,
            riskScore,
            warnings,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to expand URL" });
    }
});

module.exports = router;
