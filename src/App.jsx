import "./App.css";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DonatePage } from "./pages/DonatePage";
import { SermonsPage } from "./pages/SermonsPage";
import { MassSchedulePage } from "./pages/MassSchedulePage";
import { SacramentDetailPage } from "./pages/SacramentDetailPage";
import { SacramentsPage } from "./pages/SacramentsPage";
import { BookingPage } from "./pages/BookingPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/Sermons" element={<SermonsPage />} />
          <Route path="/mass-schedule" element={<MassSchedulePage />} />
          <Route path="/book-appointment" element={<BookingPage />} />
          <Route path="/sacraments" element={<SacramentsPage />} />
          <Route path="/sacraments/:type" element={<SacramentDetailPage />} />
          {/* 
                <Route path="*" element={<PagenotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
