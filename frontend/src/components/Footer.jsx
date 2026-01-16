export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "24px",
        color: "#64748b",
        fontSize: "14px",
      }}
    >
      Built for transparency • © {new Date().getFullYear()}
    </footer>
  );
}
