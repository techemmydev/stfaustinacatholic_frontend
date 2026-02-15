import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.admin);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Only set redirect after initial load is complete
    if (!loading && !isAuthenticated) {
      setShouldRedirect(true);
    }
  }, [loading, isAuthenticated]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (shouldRedirect || !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
