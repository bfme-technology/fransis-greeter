import { useUserSelector } from "components/users/users.selectors";
import { INACTIVITY_TIME } from "constant/global";
import { useEffect, useMemo, useRef, useState } from "react";

const useApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Welcome to BFME Fransis ...");
  const mainWindow = useRef<HTMLElement | null>(null);
  const user = useUserSelector();
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  useEffect(() => {
    document.addEventListener("load", resetInactivityTimer);
    // document.addEventListener("mousemove", resetInactivityTimer);
    // document.addEventListener("keydown", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);
    // document.addEventListener("scroll", resetInactivityTimer);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setInactivityTimer(setTimeout(performInactivityAction, INACTIVITY_TIME));

    return () => {
      //   document.removeEventListener("mousemove", resetInactivityTimer);
      //   document.removeEventListener("keydown", resetInactivityTimer);
      document.removeEventListener("click", resetInactivityTimer);
      //   document.removeEventListener("scroll", resetInactivityTimer);
    };
  }, []);

  useEffect(() => {
    setMessage("Logging in ...");
  }, [user.selectedUser]);

  const resetInactivityTimer = () => {
    inactivityTimer && clearTimeout(inactivityTimer);
    setInactivityTimer(setTimeout(performInactivityAction, INACTIVITY_TIME));
    setIsLoading(false);
    setMessage("Welcome to BFME Fransis ...");
  };
  const performInactivityAction = () => {
    // This function will be executed after 2 minutes of inactivity
    setIsLoading(true);
    setMessage(
      "Session expired due to inactivity. Please move your mouse to Login again6yu."
    );
    // Add your desired actions here, e.g., redirect, show popup, etc.
  };

  return useMemo(
    () => ({
      isLoading,
      // Add any app-specific hooks or state management here
      message,
      mainWindow,
    }),
    [isLoading]
  );
};
export default useApp;
