import { motion } from "framer-motion";

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

      <h4 style={{ marginTop: 20 }}>Redirect Chain</h4>
      <ol>
        {data.redirects.map((r, i) => (
          <li key={i}>
            {r.url} <code>{r.status}</code>
          </li>
        ))}
      </ol>

      <h4>Risk Level</h4>
      <strong>{data.riskScore.toUpperCase()}</strong>
    </motion.div>
  );
}
