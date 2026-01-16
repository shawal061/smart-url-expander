import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
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
      <button onClick={toggleTheme} style={styles.toggle}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <p style={{ color: "#475569", maxWidth: 500, margin: "10px auto" }}>
        Reveal the final destination, redirects, and safety signals behind any link
      </p>
    </motion.header>
  );
}

const styles = {
  header: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid var(--border)",
    background: "var(--card)"
  },
  logo: {
    fontSize: "1.1rem",
    margin: 0
  },
  toggle: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer"
  }
};