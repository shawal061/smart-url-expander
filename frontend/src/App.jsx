// frontend/src/App.jsx
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/expand", { url });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Smart URL Expander</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Expanding..." : "Expand URL"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p><strong>Original URL:</strong> {result.originalUrl}</p>
          <p><strong>Final URL:</strong> {result.finalUrl}</p>
          <p><strong>Redirects:</strong></p>
          <ol>
            {result.redirects.map((r, i) => (
              <li key={i}>{r.url} ({r.status})</li>
            ))}
          </ol>
          <p><strong>Metadata:</strong></p>
          <ul>
            <li>Title: {result.metadata.title}</li>
            <li>Description: {result.metadata.description}</li>
            <li>Favicon: <img src={result.metadata.favicon} alt="favicon" width="16" /></li>
          </ul>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
          {result.warnings.length > 0 && (
            <p><strong>Warnings:</strong> {result.warnings.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
