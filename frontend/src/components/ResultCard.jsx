import { useState, useEffect } from "react";
import { Copy, Share2, ExternalLink, CheckCircle, ArrowRight } from "lucide-react";
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
      padding: isMobile ? '1.25rem' : '2rem',
    }}>
      {/* Final Destination Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={{
            ...styles.heading,
            fontSize: isMobile ? '1.15rem' : '1.35rem',
          }}>
            Final Destination
          </h3>
        </div>
        
        <div style={{
          ...styles.urlCard,
          padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
        }}>
          <a 
            href={data.finalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              ...styles.link,
              fontSize: isMobile ? '0.8rem' : '0.9rem',
            }}
          >
            <span style={styles.linkText}>{data.finalUrl}</span>
            <ExternalLink size={isMobile ? 16 : 18} style={styles.externalIcon} />
          </a>
        </div>
        
        <div style={{
          ...styles.actionButtons,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.625rem' : '0.75rem',
        }}>
          <button
            onClick={handleCopy}
            style={{
              ...styles.actionButton,
              ...(copied ? styles.successButton : styles.primaryActionButton),
              width: isMobile ? '100%' : 'auto',
              flex: isMobile ? 'none' : '1',
            }}
          >
            {copied ? (
              <>
                <CheckCircle size={18} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy URL</span>
              </>
            )}
          </button>
          
          {navigator.share && (
            <button
              onClick={handleShare}
              style={{
                ...styles.actionButton,
                ...styles.secondaryActionButton,
                width: isMobile ? '100%' : 'auto',
                flex: isMobile ? 'none' : '1',
              }}
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>

      {/* Metadata Preview */}
      <MetadataPreview
        metadata={data.metadata}
        finalUrl={data.finalUrl}
      />

      {/* Redirect Chain Section */}
      <div style={{
        ...styles.section,
        marginTop: '2rem',
      }}>
        <div style={styles.sectionHeader}>
          <h4 style={{
            ...styles.subheading,
            fontSize: isMobile ? '1rem' : '1.15rem',
          }}>
            Redirect Chain
          </h4>
          <span style={{
            ...styles.badge,
            fontSize: isMobile ? '0.7rem' : '0.75rem',
          }}>
            {data.redirects.length} {data.redirects.length === 1 ? 'step' : 'steps'}
          </span>
        </div>
        
        <div style={styles.redirectChain}>
          {data.redirects.map((r, i) => (
            <div key={i} style={styles.redirectItem}>
              <div style={styles.redirectStep}>
                <div style={{
                  ...styles.stepNumber,
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                }}>
                  {i + 1}
                </div>
                {i < data.redirects.length - 1 && (
                  <div style={styles.connector}>
                    <ArrowRight size={16} style={styles.arrowIcon} />
                  </div>
                )}
              </div>
              <div style={styles.redirectContent}>
                <div style={{
                  ...styles.redirectUrl,
                  fontSize: isMobile ? '0.8rem' : '0.875rem',
                }}>
                  {r.url}
                </div>
                <code style={{
                  ...styles.statusCode,
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                }}>
                  {r.status}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Assessment Section */}
      <div style={{
        ...styles.section,
        marginTop: '2rem',
      }}>
        <h4 style={{
          ...styles.subheading,
          fontSize: isMobile ? '1rem' : '1.15rem',
          marginBottom: '0.875rem',
        }}>
          Security Assessment
        </h4>
        <RiskBadge level={data.riskScore} />
      </div>

      {/* Warnings Section */}
      {data.warnings?.length > 0 && (
        <div style={{
          ...styles.warningsContainer,
          marginTop: '1.5rem',
          padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
        }}>
          <h5 style={{
            ...styles.warningsHeading,
            fontSize: isMobile ? '0.85rem' : '0.9rem',
          }}>
            Security Warnings
          </h5>
          <ul style={{
            ...styles.warningsList,
            fontSize: isMobile ? '0.8rem' : '0.85rem',
          }}>
            {data.warnings.map((w, i) => (
              <li key={i} style={styles.warningItem}>
                <span style={styles.warningIcon}>⚠️</span>
                <span>{w}</span>
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
    background: 'var(--card)',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 2px 8px var(--shadow)',
    border: '1px solid var(--border)',
  },
  section: {
    marginBottom: '0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: '1.35rem',
    fontWeight: '700',
    color: 'var(--text)',
    margin: 0,
    lineHeight: 1.2,
  },
  subheading: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: 'var(--text)',
    margin: 0,
    lineHeight: 1.2,
  },
  badge: {
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    padding: '0.375rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  urlCard: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    marginBottom: '1rem',
  },
  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    fontWeight: '500',
    transition: 'opacity 0.2s ease',
  },
  linkText: {
    wordBreak: 'break-all',
    flex: 1,
    lineHeight: 1.5,
  },
  externalIcon: {
    flexShrink: 0,
    opacity: 0.6,
  },
  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  },
  primaryActionButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
  },
  secondaryActionButton: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  },
  successButton: {
    background: '#10b981',
    color: 'white',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
  },
  redirectChain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  redirectItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  redirectStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.75rem',
    boxShadow: '0 2px 6px rgba(99, 102, 241, 0.3)',
  },
  connector: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  arrowIcon: {
    color: 'var(--border)',
    transform: 'rotate(90deg)',
  },
  redirectContent: {
    flex: 1,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '0.875rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  redirectUrl: {
    color: 'var(--text)',
    wordBreak: 'break-all',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: '500',
  },
  statusCode: {
    alignSelf: 'flex-start',
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    padding: '0.25rem 0.625rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  warningsContainer: {
    background: 'rgba(245, 158, 11, 0.1)',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  warningsHeading: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#d97706',
    margin: '0 0 0.75rem 0',
  },
  warningsList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  warningItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    color: '#92400e',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  warningIcon: {
    flexShrink: 0,
    fontSize: '1rem',
  },
};