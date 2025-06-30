import { useSettings } from "./settings.hook";

const Settings = () => {
  const { openSettings } = useSettings();
  return (
    <div id="settings_panel">
      <div className="outbox" onClick={openSettings}></div>
      <div className="content">
        <div className="options">
          <h2>General Settings</h2>
          <div className="widget sessions">
            <strong>Sessions</strong>
            <div id="session-list"></div>
          </div>
        </div>
        <p id="prompt" className="log_box">
          <strong className="title">Login logs</strong>
        </p>
      </div>
    </div>
  );
};

export default Settings;
