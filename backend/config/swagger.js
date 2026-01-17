const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smart URL Expander API",
            version: "1.0.0",
            description: "Public API to expand short URLs, inspect redirects, metadata, and risks"
        },
        servers: [
            { url: "http://localhost:5000/api/v1" }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key"
                }
            }
        },
        security: [{ ApiKeyAuth: [] }]
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(options);