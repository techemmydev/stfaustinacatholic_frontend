import { useDispatch } from "react-redux";
import { unlockScreen } from "../Redux/slice/lockSlice";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export function LockScreen() {
  const dispatch = useDispatch();

  // prevent scrolling while locked
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-9999">
      <div className="bg-white rounded-xl shadow-xl p-10 text-center max-w-sm w-full mx-4">
        <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-[#1e3a5f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V11a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v3H9V6a3 3 0 013-3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">
          Screen Locked
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          You were inactive for a while. Click below to continue.
        </p>

        <button
          onClick={() => dispatch(unlockScreen())}
          className="w-full bg-[#8B2635] hover:bg-[#6d1d2a] text-white py-3 rounded-full transition-colors"
        >
          Unlock
        </button>
      </div>
    </div>,
    document.body,
  );
}
