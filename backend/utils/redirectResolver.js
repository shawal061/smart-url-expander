const axios = require("axios");

axios.defaults.timeout = 8000;

async function fetchWithFallback(url) {
    try {
        return await axios.head(url, {
            maxRedirects: 0,
            validateStatus: null
        });
    } catch {
        return await axios.get(url, {
            maxRedirects: 0,
            validateStatus: null
        });
    }
}

async function resolveRedirects(startUrl, maxRedirects = 10) {
    const redirects = [];
    const visited = new Set();

    let currentUrl = startUrl;

    for (let i = 0; i < maxRedirects; i++) {
        if (visited.has(currentUrl)) {
            throw new Error("Redirect loop detected");
        }
        visited.add(currentUrl);

        const response = await fetchWithFallback(currentUrl);

        redirects.push({
            url: currentUrl,
            status: response.status
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
