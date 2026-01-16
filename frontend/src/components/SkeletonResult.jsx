export default function SkeletonResult() {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 24,
        borderRadius: "var(--radius-lg)",
        background: "var(--card-bg)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="skeleton line" />
      <div className="skeleton line short" />
      <div className="skeleton block" />
    </div>
  );
}
