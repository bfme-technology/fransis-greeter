import Timer from "./components/_common/clock/clock";
import Pane from "./components/pane/pane";
import Settings from "./components/settings/settings";
import Loader from "components/loader/loader";
import useApp from "app.hook";
import Landing from "components/landing/landing";

const App = () => {
  const { isLoading, message } = useApp();
  return (
    <div className="dark">
      <Loader message={message} isLoading={isLoading} />
      {/* {!isLoading && ( */}
      <>
        <Pane />
        <Landing />
      </>
      {/* )} */}
      <Settings />
    </div>
  );
};

export default App;
