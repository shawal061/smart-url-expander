const { v4: uuidv4 } = require("uuid");

function generateApiKey() {
    return `sk_live_${uuidv4().replace(/-/g, "")}`;
}

module.exports = generateApiKey;