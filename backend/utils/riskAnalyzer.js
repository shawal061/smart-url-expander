// backend/utils/riskAnalyzer.js

function analyzeRisk(redirects) {
    const warnings = [];
    const maxRedirects = 5;

    if (redirects.length > maxRedirects) {
        warnings.push("Multiple redirects");
    }

    redirects.forEach(({ url }) => {
        try {
            const tld = url.split(".").pop();
            if (["tk", "xyz", "cn"].includes(tld)) {
                warnings.push(`Suspicious TLD detected: .${tld}`);
            }

            if (url.startsWith("http://")) {
                warnings.push("Insecure HTTP URL detected");
            }
        } catch { }
    });

    let riskScore = "low";
    if (warnings.length === 1) riskScore = "medium";
    if (warnings.length > 1) riskScore = "high";

    return { warnings, riskScore };
}

module.exports = analyzeRisk;
