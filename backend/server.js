// backend/server.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Utility: simple risk detection
function analyzeRisk(redirects) {
    const warnings = [];
    const maxRedirects = 5;

    if (redirects.length > maxRedirects) warnings.push("Multiple redirects");

    redirects.forEach(({ url }) => {
        try {
            const tld = url.split(".").pop();
            if (["tk", "xyz", "cn"].includes(tld)) {
                warnings.push(`Suspicious TLD detected: .${tld}`);
            }
            if (url.startsWith("http://")) warnings.push("Insecure HTTP URL detected");
        } catch { }
    });

    const riskScore = warnings.length === 0 ? "low" : warnings.length > 1 ? "medium" : "high";

    return { warnings, riskScore };
}

// POST /expand endpoint
app.post("/expand", async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const redirects = [];
        let currentUrl = url;
        let response;
        const maxRedirects = 10;

        for (let i = 0; i < maxRedirects; i++) {
            response = await axios.head(currentUrl, { maxRedirects: 0, validateStatus: null });

            redirects.push({ url: currentUrl, status: response.status });

            if (response.status >= 300 && response.status < 400 && response.headers.location) {
                currentUrl = new URL(response.headers.location, currentUrl).href;
            } else {
                break;
            }
        }

        // Fetch metadata from final URL
        const finalResponse = await axios.get(currentUrl);
        const $ = cheerio.load(finalResponse.data);

        const metadata = {
            title: $("title").text() || null,
            description: $('meta[name="description"]').attr("content") || null,
            favicon: $('link[rel="icon"]').attr("href") || "/favicon.ico",
        };

        // Risk analysis
        const { warnings, riskScore } = analyzeRisk(redirects);

        res.json({
            originalUrl: url,
            finalUrl: currentUrl,
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
