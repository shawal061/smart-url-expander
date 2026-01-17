const cache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes

function getCached(url) {
    const entry = cache.get(url);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
        cache.delete(url);
        return null;
    }

    return entry.data;
}

function setCache(url, data) {
    cache.set(url, {
        data,
        expiry: Date.now() + TTL
    });
}

module.exports = { getCached, setCache };
