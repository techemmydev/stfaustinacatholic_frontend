import "./App.css";
import Layout from "./layout/Layout";

import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/contact" element={<ContactForm />} />
                <Route path="/book" element={<BookingPage />} />
                <Route path="/bookingform" element={<BookingForm />} />
                <Route path="/service" element={<Servicepage />} />
                <Route path="/aboutus" element={<Aboutuspage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="*" element={<PagenotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
