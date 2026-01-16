import UrlForm from "../components/UrlForm";
import AppLayout from "../layouts/AppLayout";

export default function Popup() {
  return (
    <AppLayout compact>
      <h3 style={{ textAlign: "center", color: "#6366f1" }}>
        Smart URL Expander
      </h3>
      <UrlForm />
    </AppLayout>
  );
}
