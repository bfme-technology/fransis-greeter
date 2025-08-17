import Pane from "./components/pane/pane";
import Settings from "./components/settings/settings";
import useApp from "app.hook";
import Landing from "./components/landing/landing";
import Shutter from "./components/shutter/shutter";
import AppContainer from "./app.styles";
import Loader from "@common/loader/loader";

const App = () => {
  const { isLoading, message, inactivityShutter } = useApp();
  return (
    <AppContainer className="dark">
      <Loader message={message} isLoading={isLoading} />
      {!isLoading && !inactivityShutter && (
        <>
          <Pane />
          <Landing />
        </>
      )}
      {inactivityShutter && <Shutter />}
      <Settings />
    </AppContainer>
  );
};

export default App;
