import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lockScreen } from "../Redux/slice/lockSlice";

const TIMEOUT = 2 * 60 * 1000; // 5 minutes, change as needed

export function useInactivity() {
  const dispatch = useDispatch();
  const { isLocked } = useSelector((state) => state.lock);

  useEffect(() => {
    // Don't run the timer if screen is already locked
    if (isLocked) return;

    let timer = setTimeout(() => {
      dispatch(lockScreen());
    }, TIMEOUT);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(lockScreen());
      }, TIMEOUT);
    };

    // Reset timer on any user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [isLocked, dispatch]);
}
