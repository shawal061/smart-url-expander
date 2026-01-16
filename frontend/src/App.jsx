import Header from "./components/Header";
import Footer from "./components/Footer";
import UrlForm from "./components/UrlForm";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <>
      <Header />
      <AppLayout>
        <UrlForm />
      </AppLayout>
      <Footer />
    </>
  );
}
