import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import ResultCard from "./ResultCard";
import SkeletonResult from "./SkeletonResult";

const API = import.meta.env.VITE_API_BASE_URL;

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(`${API}/expand`, { url });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not expand URL. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      ...styles.wrapper,
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '100%' : '640px',
    }}>
      <form
        onSubmit={submit}
        style={{
          ...styles.form,
          padding: isMobile ? '1rem' : '1.5rem',
          gap: isMobile ? '0.75rem' : '1rem',
        }}
      >
        <div style={styles.inputWrapper}>
          <input
            type="url"
            placeholder="Paste a shortened or suspicious URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{
              ...styles.input,
              fontSize: isMobile ? '0.95rem' : '1rem',
              padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          style={{
            ...styles.button,
            fontSize: isMobile ? '0.95rem' : '1rem',
            padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
            opacity: loading || !url.trim() ? 0.6 : 1,
            cursor: loading || !url.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={isMobile ? 18 : 20} style={{ animation: 'spin 1s linear infinite' }} />
              Analyzing...
            </>
          ) : (
            <>
              Expand URL
              <ArrowRight size={isMobile ? 18 : 20} />
            </>
          )}
        </button>
      </form>

      {error && (
        <div style={{
          ...styles.errorContainer,
          padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
          fontSize: isMobile ? '0.85rem' : '0.875rem',
        }}>
          <span style={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {loading && <SkeletonResult />}
      {result && !loading && <ResultCard data={result} />}
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: '640px',
  },
  form: {
    background: 'var(--card-bg)',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border)',
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid var(--border)',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    background: 'var(--card-bg)',
    color: 'var(--text)',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  },
  errorContainer: {
    marginTop: '1rem',
    padding: '1rem 1.25rem',
    background: '#FEE2E2',
    border: '1px solid #FCA5A5',
    borderRadius: '12px',
    color: '#991B1B',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    lineHeight: 1.5,
  },
  errorIcon: {
    fontSize: '1.25rem',
    flexShrink: 0,
  },
};