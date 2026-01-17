const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: (req) => {
        return req.apiLimit || 50;
    },

    keyGenerator: (req, res) => {
        // Prefer API key
        if (req.apiKey) return req.apiKey;

        // Fallback to safe IP handling (IPv4 + IPv6 safe)
        return ipKeyGenerator(req, res);
    },

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        error: "Rate limit exceeded. Please try again later."
    }
});

module.exports = rateLimiter;
