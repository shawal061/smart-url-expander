function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value);

        if (!["http:", "https:"].includes(parsed.protocol)) return false;

        // Block localhost & private IPs
        const hostname = parsed.hostname;
        if (
            hostname === "localhost" ||
            hostname.startsWith("127.") ||
            hostname.startsWith("192.168.") ||
            hostname.startsWith("10.")
        ) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

module.exports = isValidHttpUrl;
