export const usePane = () => {
  const systemShutDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // window.lightdm.shutdown();
  };

  const openSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // window.lightdm.open_settings();
  };

  return {
    systemShutDown,
    openSettings,
  };
};
