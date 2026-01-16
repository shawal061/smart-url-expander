export default function AppLayout({ children, compact = false }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: compact ? "16px" : "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: compact ? 380 : 720,
        }}
      >
        {children}
      </div>
    </div>
  );
}
