import { useState, useEffect } from "react";

export default function MetadataPreview({ metadata, finalUrl }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!metadata) return null;

  return (
    <div style={{
      ...styles.container,
      flexDirection: isMobile ? 'column' : 'row',
      padding: isMobile ? '12px' : '16px',
      gap: isMobile ? '12px' : '16px',
    }}>
      {metadata.favicon && (
        <img
          src={metadata.favicon}
          alt="Site favicon"
          style={{
            ...styles.favicon,
            alignSelf: isMobile ? 'center' : 'flex-start',
          }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <div style={{
        ...styles.content,
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <strong style={{
          ...styles.title,
          fontSize: isMobile ? '0.95rem' : '1rem',
        }}>
          {metadata.title || "Untitled Page"}
        </strong>
        {metadata.description && (
          <p style={{
            ...styles.description,
            fontSize: isMobile ? '0.8rem' : '0.875rem',
          }}>
            {metadata.description}
          </p>
        )}
        <small style={{
          ...styles.hostname,
          fontSize: isMobile ? '0.75rem' : '0.8rem',
        }}>
          {new URL(finalUrl).hostname}
        </small>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.25rem',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    background: 'rgba(99, 102, 241, 0.02)',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  favicon: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    flexShrink: 0,
    objectFit: 'cover',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text)',
    marginBottom: '0.5rem',
    lineHeight: 1.4,
  },
  description: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0.5rem 0',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  hostname: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: '0.5rem',
  },
};