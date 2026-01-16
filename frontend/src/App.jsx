import Header from "./components/Header";
import Footer from "./components/Footer";
import UrlForm from "./components/UrlForm";
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <AppLayout>
          <UrlForm />
        </AppLayout>
        <Footer />
      </ThemeProvider>
    </>
  );
}
