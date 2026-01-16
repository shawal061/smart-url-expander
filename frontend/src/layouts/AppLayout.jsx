export default function AppLayout({ children, compact = false }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
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