import { AppProvider } from "./context/AppContext";
import Header from "./Layout/Header/Header";
import NavBar from "./Layout/NavBar/NavBar";
import InvoiceAppRoutes from "./Routes/Routes";

function App() {
  return (
    <>
      <Header />
      <main>
        <AppProvider>
          <NavBar />
          <InvoiceAppRoutes />
        </AppProvider>
      </main>
    </>
  );
}

export default App;
