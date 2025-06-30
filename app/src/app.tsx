import Timer from "./components/timer/timer";
import Pane from "./components/pane/pane";
import Settings from "./components/settings/settings";

const App = () => {
  return (
    <div className="dark">
      <Pane />
      <Timer />
      <Settings />
    </div>
  );
};

export default App;
