import { useState, useEffect } from "react";
import { Copy, Share2, ExternalLink, CheckCircle } from "lucide-react";
import RiskBadge from "./RiskBadge";
import MetadataPreview from "./MetadataPreview";

export default function ResultCard({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.finalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Expanded URL",
        url: data.finalUrl,
      });
    }
  };

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? '1rem' : '1.5rem',
    }}>
      <div style={styles.section}>
        <h3 style={{
          ...styles.heading,
          fontSize: isMobile ? '1.1rem' : '1.25rem',
        }}>
          Final Destination
        </h3>
        <div style={styles.urlContainer}>
          <a 
            href={data.finalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              ...styles.link,
              fontSize: isMobile ? '0.85rem' : '0.95rem',
            }}
          >
            {data.finalUrl}
            <ExternalLink size={14} style={{ flexShrink: 0 }} />
          </a>
        </div>
        
        <div style={{
          ...styles.buttonGroup,
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <button
            onClick={handleCopy}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {copied ? (
              <>
                <CheckCircle size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy URL
              </>
            )}
          </button>
          
          {navigator.share && (
            <button
              onClick={handleShare}
              style={{
                ...styles.button,
                ...styles.secondaryButton,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Share2 size={16} />
              Share
            </button>
          )}
        </div>
      </div>

      <MetadataPreview
        metadata={data.metadata}
        finalUrl={data.finalUrl}
      />

      <div style={styles.section}>
        <h4 style={{
          ...styles.subheading,
          fontSize: isMobile ? '0.95rem' : '1rem',
        }}>
          Redirect Chain
        </h4>
        <ol style={{
          ...styles.list,
          fontSize: isMobile ? '0.8rem' : '0.875rem',
        }}>
          {data.redirects.map((r, i) => (
            <li key={i} style={styles.listItem}>
              <span style={styles.redirectUrl}>{r.url}</span>
              <code style={styles.statusCode}>{r.status}</code>
            </li>
          ))}
        </ol>
      </div>

      <div style={styles.section}>
        <h4 style={{
          ...styles.subheading,
          fontSize: isMobile ? '0.95rem' : '1rem',
        }}>
          Security Assessment
        </h4>
        <RiskBadge level={data.riskScore} />
      </div>

      {data.warnings?.length > 0 && (
        <div style={styles.warningsContainer}>
          <ul style={{
            ...styles.warningsList,
            fontSize: isMobile ? '0.8rem' : '0.875rem',
          }}>
            {data.warnings.map((w, i) => (
              <li key={i} style={styles.warningItem}>
                ⚠️ {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.5rem',
    background: 'var(--card-bg)',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border)',
  },
  section: {
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text)',
    marginBottom: '0.75rem',
    marginTop: 0,
  },
  subheading: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text)',
    marginBottom: '0.75rem',
    marginTop: 0,
  },
  urlContainer: {
    marginBottom: '1rem',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    wordBreak: 'break-all',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  primaryButton: {
    background: '#6366f1',
    color: 'white',
  },
  secondaryButton: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  },
  list: {
    margin: 0,
    paddingLeft: '1.5rem',
  },
  listItem: {
    marginBottom: '0.75rem',
    color: '#475569',
    lineHeight: 1.6,
  },
  redirectUrl: {
    wordBreak: 'break-all',
    marginRight: '0.5rem',
  },
  statusCode: {
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  warningsContainer: {
    background: '#FEF3C7',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #FDE68A',
  },
  warningsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#92400E',
  },
  warningItem: {
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
};