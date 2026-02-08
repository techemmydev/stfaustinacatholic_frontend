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

import ThanksgivingBooking from "./UiComponents/ThanksgivingBooking";
import { ForgotPassword } from "./UiComponents/ForgotPassword";
import ParishRegistrationForm from "./UiComponents/ParishRegistrationForm";
import PagenotFound from "./pages/PagenotFound";
import { CookieBanner } from "./UiComponents/CookieBanner";
import { useInactivity } from "./utils/useInactivity";
import { LockScreen } from "./UiComponents/LockScreen";
import { useSelector } from "react-redux";

// Import Admin Components
import { AdminLoginPage } from "./Adminpages/AdminLoginPage";
import { AdminLayout } from "./Adminpages/AdminLayout";
import { AdminDashboardPage } from "./Adminpages/AdminDashboardPage";
import { AdminAppointmentsPage } from "./Adminpages/AdminAppointmentsPage";
import { AdminPriestsPage } from "./Adminpages/AdminPriestsPage";
import { AdminMassSchedulePage } from "./Adminpages/AdminMassSchedulePage";
import { AdminSettingsPage } from "./Adminpages/AdminSettingsPage";
import { AdminUsersPage } from "./Adminpages/AdminUsersPage";
import { ProtectedRoute } from "./Adminpages/ProtectedRoute";

import { AdminMassBooking } from "./Adminpages/AdminMassBooking";
import { AdminEvents } from "./Adminpages/AdminEvents";
import { AdminParishioners } from "./Adminpages/AdminParishioners";
import { AdminReviews } from "./Adminpages/AdminReviews";

function App() {
  useInactivity(); // starts the inactivity timer
  const { isLocked } = useSelector((state) => state.lock);

  return (
    <>
      {isLocked && <LockScreen />}
      <CookieBanner />
      <Routes>
        {/* Existing Admin Login (if you want to keep it) */}

        <Route path="/admin-forgot-password" element={<ForgotPassword />} />

        {/* New Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="appointments" element={<AdminAppointmentsPage />} />
          <Route path="mass-bookings" element={<AdminMassBooking />} />
          <Route path="priests" element={<AdminPriestsPage />} />
          <Route path="mass-schedule" element={<AdminMassSchedulePage />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="parishioners" element={<AdminParishioners />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Public Routes */}
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
          <Route path="/mass-booking" element={<ThanksgivingBooking />} />
          <Route path="/register" element={<ParishRegistrationForm />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
