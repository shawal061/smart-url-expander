import { Heart, Shield, Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer style={styles.footer}>
      <div style={{
        ...styles.container,
        padding: isMobile ? '1.5rem 1rem 1rem' : '2rem 2rem 1.5rem',
      }}>
        <div style={{
          ...styles.content,
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          gap: isMobile ? '1rem' : '1rem',
        }}>
          <div style={{
            ...styles.leftSection,
            flex: isMobile ? '0' : '1',
            minWidth: isMobile ? 'auto' : '200px',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <div style={styles.badge}>
              <Shield size={14} />
              <span>Built for transparency</span>
            </div>
          </div>
          
          <div style={{
            ...styles.centerSection,
            flex: isMobile ? '0' : '1',
            minWidth: isMobile ? 'auto' : '200px',
          }}>
            <p style={{
              ...styles.copyright,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
            }}>
              © {new Date().getFullYear()} Smart URL Expander
            </p>
          </div>
          
          <div style={{
            ...styles.rightSection,
            flex: isMobile ? '0' : '1',
            minWidth: isMobile ? 'auto' : '200px',
            textAlign: isMobile ? 'center' : 'right',
          }}>
            <div
              style={{
                ...styles.madeWith,
                fontSize: isMobile ? '0.8rem' : '0.875rem',
              }}
            >
              Made with <Heart size={14} style={styles.heart} /> by developers
            </div>
          </div>
        </div>
        
        <div style={styles.divider} />
        
        <div style={{
          ...styles.links,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.5rem' : '0.75rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <a href="#" style={{
              ...styles.link,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
            }}>
              Privacy
            </a>
            {!isMobile && <span style={styles.dot}>•</span>}
            <a href="#" style={{
              ...styles.link,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
            }}>
              Terms
            </a>
            {!isMobile && <span style={styles.dot}>•</span>}
            <a href="#" style={{
              ...styles.link,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
            }}>
              API Docs
            </a>
            {!isMobile && <span style={styles.dot}>•</span>}
            <a href="#" style={{
              ...styles.link,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
            }}>
              <Github size={14} style={{ verticalAlign: "middle" }} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.03) 100%)",
    borderTop: "1px solid var(--border)",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 2rem 1.5rem",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  leftSection: {
    flex: "1",
    minWidth: "200px",
  },
  centerSection: {
    flex: "1",
    textAlign: "center",
    minWidth: "200px",
  },
  rightSection: {
    flex: "1",
    textAlign: "right",
    minWidth: "200px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    background: "rgba(99, 102, 241, 0.1)",
    borderRadius: "20px",
    fontSize: "0.875rem",
    color: "#6366f1",
    fontWeight: "500",
  },
  copyright: {
    margin: 0,
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500",
  },
  madeWith: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500",
  },
  heart: {
    color: "#ef4444",
    fill: "#ef4444",
  },
  divider: {
    height: "1px",
    background: "var(--border)",
    margin: "1rem 0",
    opacity: 0.5,
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
    fontSize: "0.875rem",
  },
  link: {
    color: "#64748b",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
  },
  dot: {
    color: "#cbd5e1",
  },
};