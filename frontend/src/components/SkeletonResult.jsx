import { useState, useEffect } from "react";

export default function SkeletonResult() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? '1rem' : '1.5rem',
    }}>
      <div style={styles.skeleton}>
        <div style={{
          ...styles.line,
          width: isMobile ? '60%' : '40%',
          height: isMobile ? '18px' : '20px',
        }} />
      </div>
      <div style={styles.skeleton}>
        <div style={{
          ...styles.line,
          width: isMobile ? '85%' : '70%',
          height: isMobile ? '14px' : '16px',
        }} />
      </div>
      <div style={styles.skeleton}>
        <div style={{
          ...styles.block,
          height: isMobile ? '80px' : '100px',
        }} />
      </div>
      <div style={styles.skeleton}>
        <div style={{
          ...styles.line,
          width: isMobile ? '50%' : '30%',
          height: isMobile ? '14px' : '16px',
        }} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    borderRadius: '16px',
    background: 'var(--card-bg)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border)',
  },
  skeleton: {
    marginBottom: '1rem',
  },
  line: {
    height: '16px',
    background: 'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px',
  },
  block: {
    width: '100%',
    height: '100px',
    background: 'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '12px',
  },
};