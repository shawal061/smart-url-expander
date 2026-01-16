import { Link2, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <header style={styles.header}>
      <div style={{
        ...styles.container,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1rem' : '2rem',
        padding: isMobile ? '1rem 1rem' : '1.5rem 2rem',
      }}>
        <div style={{
          ...styles.logoSection,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
          <div 
            style={{
              ...styles.iconWrapper,
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
            }}
          >
            <Link2 
              size={isMobile ? 24 : 32} 
              strokeWidth={2.5} 
              style={{ color: "#ffffff" }} 
            />
          </div>
          <div style={{
            ...styles.textWrapper,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <h1 style={{
              ...styles.title,
              fontSize: isMobile ? '1.25rem' : '1.5rem',
            }}>
              Smart URL Expander
            </h1>
            <p style={{
              ...styles.subtitle,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}>
              {isMobile ? 'Reveal destinations & safety' : 'Reveal destinations, redirects & safety signals'}
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          style={{
            ...styles.themeToggle,
            position: isMobile ? 'absolute' : 'relative',
            top: isMobile ? '1rem' : 'auto',
            right: isMobile ? '1rem' : 'auto',
          }}
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
    borderBottom: "1px solid var(--border)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    position: "relative",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
    flexShrink: 0,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0,
    fontWeight: "500",
    lineHeight: 1.4,
  },
  themeToggle: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    flexShrink: 0,
  },
};