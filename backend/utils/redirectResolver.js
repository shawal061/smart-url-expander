// backend/utils/redirectResolver.js

const axios = require("axios");

async function resolveRedirects(startUrl, maxRedirects = 10) {
    const redirects = [];
    let currentUrl = startUrl;

    for (let i = 0; i < maxRedirects; i++) {
        const response = await axios.head(currentUrl, {
            maxRedirects: 0,
            validateStatus: null,
        });

        redirects.push({
            url: currentUrl,
            status: response.status,
        });

        if (
            response.status >= 300 &&
            response.status < 400 &&
            response.headers.location
        ) {
            currentUrl = new URL(response.headers.location, currentUrl).href;
        } else {
            break;
        }
    }

    return { finalUrl: currentUrl, redirects };
}

module.exports = resolveRedirects;
