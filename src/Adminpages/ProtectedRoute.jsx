import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentAdmin } from "../Redux/slice/adminSlice";

export function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.admin);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // On refresh, try to restore session from the cookie
    dispatch(getCurrentAdmin()).finally(() => setAuthChecked(true));
  }, [dispatch]);

  // Still verifying — don't redirect yet
  if (!authChecked || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Cookie expired or invalid — go to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
