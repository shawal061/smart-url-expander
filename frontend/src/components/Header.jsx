import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "var(--primary)" }}>
        Smart URL Expander
      </h1>
      <p style={{ color: "#475569", maxWidth: 500, margin: "10px auto" }}>
        Reveal the final destination, redirects, and safety signals behind any link
      </p>
    </motion.header>
  );
}
