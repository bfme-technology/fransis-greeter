import { useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState<any>({
    theme: "light",
    language: "en",
  });
  const openSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // Open settings logic here
  };
  return {
    settings,
    setSettings,
    openSettings,
  };
};
