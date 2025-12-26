import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a slight delay to show the loading indicator
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  return (
    <div>
      <Navbar />

      {/* Show loading indicator while the page is loading */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <main>
          <Outlet /> {/* Page content renders here after loading */}
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Layout;
