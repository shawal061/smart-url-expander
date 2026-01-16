export default function MetadataPreview({ metadata, finalUrl }) {
  if (!metadata) return null;

  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        border: "1px solid var(--border)",
        display: "flex",
        gap: 12,
      }}
    >
      <img
        src={metadata.favicon}
        alt=""
        width={32}
        height={32}
        onError={(e) => (e.target.style.display = "none")}
      />

      <div>
        <strong>{metadata.title || "Untitled Page"}</strong>
        <p style={{ fontSize: 14, color: "#475569" }}>
          {metadata.description}
        </p>
        <small>{new URL(finalUrl).hostname}</small>
      </div>
    </div>
  );
}
