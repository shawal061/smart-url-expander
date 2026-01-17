const apiKeys = require("../config/apiKeys");

function apiKeyAuth(req, res, next) {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
        return res.status(401).json({
            error: "API key missing"
        });
    }

    const keyData = apiKeys.get(apiKey);

    if (!keyData) {
        return res.status(403).json({
            error: "Invalid API key"
        });
    }

    // Attach key info to request
    req.apiKey = apiKey;
    req.apiPlan = keyData.plan;
    req.apiLimit = keyData.limit;

    next();
}

module.exports = apiKeyAuth;
