import { Shield, AlertTriangle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const riskStyles = {
  low: { 
    bg: "#DCFCE7", 
    color: "#166534", 
    label: "Safe",
    icon: Shield,
  },
  medium: { 
    bg: "#FEF3C7", 
    color: "#92400E", 
    label: "Caution",
    icon: AlertTriangle,
  },
  high: { 
    bg: "#FEE2E2", 
    color: "#991B1B", 
    label: "Danger",
    icon: AlertCircle,
  },
};

export default function RiskBadge({ level }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const riskData = riskStyles[level];
  const Icon = riskData.icon;

  return (
    <span style={{
      ...styles.badge,
      background: riskData.bg,
      color: riskData.color,
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      padding: isMobile ? '6px 12px' : '8px 16px',
    }}>
      <Icon size={isMobile ? 14 : 16} strokeWidth={2.5} />
      {riskData.label}
    </span>
  );
}

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '8px 16px',
    borderRadius: '999px',
    fontWeight: '600',
    fontSize: '0.8125rem',
    lineHeight: 1,
  },
};