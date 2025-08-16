import { useEffect, useRef, useState } from "react";
import { calculateDate, calculateTime, calculateTimeZone } from "./time.utils";

/**
 * Custom React hook that provides the current time, date, and time zone.
 *
 * - Initializes and updates the time and date every second.
 * - Automatically detects and updates the time zone on mount.
 * - Cleans up the interval timer on component unmount.
 * @author Deepak Belbase <supdpk@icloud.com>
 * @version 1.0.0
 * @returns An object containing:
 * - `time`: The current time value.
 * - `date`: The current date value.
 * - `timeZone`: The current time zone string.
 */
const useTime = () => {
  const [time, setTime] = useState(calculateTime());
  const [date, setDate] = useState(calculateDate());
  const [timeZone, setTimeZone] = useState(calculateTimeZone());
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeZone(calculateTimeZone());

    timeRef.current = window.setInterval(() => {
      setTime(calculateTime());
      setDate(calculateDate());
    }, 1000);

    return () => {
      if (timeRef.current !== null) {
        clearInterval(timeRef.current);
      }
    };
  }, []);

  return { time, date, timeZone };
};

export default useTime;
