import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
        <UrlForm />
      </main>
      <Footer />
    </>
  );
}
