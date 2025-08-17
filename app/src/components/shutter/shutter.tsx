import Clock from "components/_common/clock/clock";
import ShutterContainer from "./shutter.styles";
import Feed from "./feed/feed";

const Shutter = () => {
  return (
    <ShutterContainer>
      <div className="clock">
        <Clock />
      </div>
      <div className="feed">
        <Feed />
      </div>
    </ShutterContainer>
  );
};

export default Shutter;
