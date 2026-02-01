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
import { LoginPage } from "./pages/Loginpage";
import ThanksgivingBooking from "./UiComponents/ThanksgivingBooking";
import { ForgotPassword } from "./UiComponents/ForgotPassword";
import ParishRegistrationForm from "./UiComponents/ParishRegistrationForm";
import PagenotFound from "./pages/PagenotFound";
import { CookieBanner } from "./UiComponents/CookieBanner";
import { useInactivity } from "./lib/useInactivity";
import { LockScreen } from "./UiComponents/LockScreen";
import { useSelector } from "react-redux";
function App() {
  useInactivity(); // starts the inactivity timer
  const { isLocked } = useSelector((state) => state.lock);
  return (
    <>
      {isLocked && <LockScreen />}
      <CookieBanner />
      <Routes>
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/admin-forgot-password" element={<ForgotPassword />} />

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
          <Route path="//mass-booking" element={<ThanksgivingBooking />} />
          <Route path="/register" element={<ParishRegistrationForm />} />
        </Route>
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
