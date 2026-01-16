import Header from "./components/Header";
import Footer from "./components/Footer";
import UrlForm from "./components/UrlForm";
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div style={styles.appContainer}>
        <Header />
        <main style={styles.mainContent}>
          <AppLayout>
            <UrlForm />
          </AppLayout>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

const styles = {
  appContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};