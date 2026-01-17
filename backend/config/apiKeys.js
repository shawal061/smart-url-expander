// In production, move this to DB or ENV
const apiKeys = new Map([
    ["sk_public_demo_123", { plan: "free", limit: 100 }],
    ["sk_extension_demo_456", { plan: "extension", limit: 500 }],
]);

module.exports = apiKeys;