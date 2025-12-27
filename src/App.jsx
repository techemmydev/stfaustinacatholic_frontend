import "./App.css";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DonatePage } from "./pages/DonatePage";
import { SermonsPage } from "./pages/SermonsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="Sermons" element={<SermonsPage />} />
          {/* 
                <Route path="*" element={<PagenotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
