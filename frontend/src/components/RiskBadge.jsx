const styles = {
  low: { bg: "#DCFCE7", color: "#166534", label: "Safe" },
  medium: { bg: "#FEF3C7", color: "#92400E", label: "Caution" },
  high: { bg: "#FEE2E2", color: "#991B1B", label: "Danger" },
};

export default function RiskBadge({ level }) {
  const style = styles[level];

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        padding: "6px 14px",
        borderRadius: "999px",
        fontWeight: 600,
        fontSize: 13,
      }}
    >
      {style.label}
    </span>
  );
}
