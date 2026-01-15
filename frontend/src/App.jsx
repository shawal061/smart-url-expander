import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post(`${API_URL}/expand`, { url });
      setData(res.data);
    } catch {
      setError("Failed to expand URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <h1>🔗 Smart URL Expander</h1>
        <p>See where links REALLY go</p>
      </header>

      <motion.form
        className="input-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="url"
          placeholder="Paste a shortened or suspicious URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Analyzing..." : "Expand URL"}
        </button>
      </motion.form>

      {loading && (
        <motion.div
          className="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🔍 Expanding link…
        </motion.div>
      )}

      {error && <p className="error">{error}</p>}

      <AnimatePresence>
        {data && (
          <motion.div
            className="result-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="final-url">
              <span>Final Destination</span>
              <a href={data.finalUrl} target="_blank">
                {data.finalUrl}
              </a>
            </div>

            <div className="risk">
              <span className={`badge ${data.riskScore}`}>
                Risk: {data.riskScore.toUpperCase()}
              </span>
              {data.warnings.map((w, i) => (
                <p key={i} className="warning">⚠ {w}</p>
              ))}
            </div>

            <div className="redirects">
              <h3>Redirect Chain</h3>
              <ol>
                {data.redirects.map((r, i) => (
                  <li key={i}>
                    <span>{r.url}</span>
                    <code>{r.status}</code>
                  </li>
                ))}
              </ol>
            </div>

            <div className="metadata">
              <h3>Page Preview</h3>
              <p><strong>{data.metadata.title}</strong></p>
              <p>{data.metadata.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        Built for safety & transparency
      </footer>
    </div>
  );
}
