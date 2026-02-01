import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCookieConsent,
  fetchCookieConsent,
} from "../Redux/slice/cookieSlice";

export function CookieBanner() {
  const dispatch = useDispatch();
  const { consent, loading } = useSelector((state) => state.cookie);

  // Check if user already has a consent saved
  useEffect(() => {
    dispatch(fetchCookieConsent());
  }, [dispatch]);

  const handleAccept = () => {
    dispatch(saveCookieConsent("accepted"));
  };

  const handleReject = () => {
    dispatch(saveCookieConsent("rejected"));
  };

  // Don't show banner if consent already exists or still loading
  if (loading || consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e3a5f] text-white shadow-lg z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-200 text-center sm:text-left">
          We use cookies to improve your experience on our website. By
          continuing to use this site, you accept our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-5 py-2 text-sm border border-gray-400 text-gray-200 rounded-full hover:bg-gray-700 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
