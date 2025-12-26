import React from "react";
import { Outlet } from "react-router";

import Navbar from "@/UiComponents/NavbarHeader";
import { Footer } from "@/UiComponents/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet /> {/* Page content renders here after loading */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
