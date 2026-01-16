import { motion } from "framer-motion";
import RiskBadge from "./RiskBadge";
import MetadataPreview from "./MetadataPreview";

export default function ResultCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 24,
        background: "var(--card-bg)",
        padding: 24,
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow)",
      }}
    >
      <h3>Final Destination</h3>
      <a href={data.finalUrl} target="_blank" style={{ color: "#2563eb" }}>
        {data.finalUrl}
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(data.finalUrl)}
        style={{
          marginTop: 10,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          cursor: "pointer",
        }}
      >
        📋 Copy Final URL
      </button>
      {navigator.share && (
        <button
          onClick={() =>
            navigator.share({
              title: "Expanded URL",
              url: data.finalUrl,
            })
          }
          style={{
            marginLeft: 10,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            cursor: "pointer",
          }}
        >
          🔗 Share
        </button>
      )}

      <MetadataPreview
        metadata={data.metadata}
        finalUrl={data.finalUrl}
      />

      <h4 style={{ marginTop: 20 }}>Redirect Chain</h4>
      <ol>
        {data.redirects.map((r, i) => (
          <li key={i}>
            {r.url} <code>{r.status}</code>
          </li>
        ))}
      </ol>

      <h4 style={{ marginTop: 20 }}>Risk Level</h4>
      <RiskBadge level={data.riskScore} />

      {data.warnings?.length > 0 && (
        <ul style={{ marginTop: 10, color: "#92400E" }}>
          {data.warnings.map((w, i) => (
            <li key={i}>⚠ {w}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
