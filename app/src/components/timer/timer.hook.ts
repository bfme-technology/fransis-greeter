import { useUserSelector } from "./../users/users.selectors";
import { useEffect, useState } from "react";

export const useTimer = () => {
  const [date, setDate] = useState("30 Feb, 2025");
  const [time, setTime] = useState("23:59");
  const [actualZone, setActualZone] = useState<string>("");
  const [majorClass, setMajorClass] = useState("show");

  const userState = useUserSelector();
  useEffect(() => {
    if (userState.selectedUser && userState.isUserSelected) {
      setMajorClass("hide");
    } else {
      setMajorClass("show");
    }
  }, [userState.selectedUser]);

  useEffect(() => {
    const dateTime = new Date();
    const interval = setInterval(() => {
      const dateOptions = {
        year: "numeric" as const,
        month: "long" as const,
        day: "numeric" as const,
      };
      const timeOptions = {
        hour: "numeric" as const,
        minute: "numeric" as const,
        // second: "numeric" as const,
      };
      setDate(dateTime.toLocaleDateString("en-US", dateOptions));
      setTime(dateTime.toLocaleTimeString("en-US", timeOptions));
    }, 1000);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setActualZone(timeZone);
    return () => clearInterval(interval);
  }, []);

  const pageShow = () => {
    const entryPage = document.querySelector(".entry_page");
    const major = document.querySelector(".major");
    const userList = document.querySelector("#user-list");
  };

  return { date, time, pageShow, actualZone, majorClass };
};
