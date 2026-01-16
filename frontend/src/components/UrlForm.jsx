import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const API = import.meta.env.VITE_API_BASE_URL;

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(`${API}/expand`, { url });
      setResult(res.data);
    } catch {
      setError("Could not expand URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "var(--card-bg)",
          padding: 24,
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow)",
          display: "flex",
          gap: 12,
          flexDirection: "column",
        }}
      >
        <input
          type="url"
          placeholder="Paste a shortened or suspicious URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: 16,
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            fontSize: 16,
          }}
        />

        <button
          disabled={loading}
          style={{
            padding: 16,
            borderRadius: "var(--radius-md)",
            background: "var(--primary)",
            color: "white",
            fontSize: 16,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Expand URL"}
        </button>
      </motion.form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      <AnimatePresence>
        {loading && <Loader />}
        {result && <ResultCard data={result} />}
      </AnimatePresence>
    </div>
  );
}
