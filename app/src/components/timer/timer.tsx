import { useTimer } from "./timer.hook";
import logo from "./logo.svg";
import Login from "./../login/login";
import Users from "./../users/users";

const Timer = () => {
  const { time, date, actualZone, majorClass } = useTimer();

  return (
    <div className="container">
      <div className="logo-wrapper">
        <img src={logo} alt="" className="logo" />
        <span className="logo-text">Arch Linux</span>
      </div>
      <div className={`major ${majorClass}`}>
        <div className="greeting">
          <div className="welcome">
            <p>
              <span id="_date">{date}</span>
              <span>|</span>
              <span id="_actualZone">{actualZone}</span>
            </p>
            <h1 className="lilita-one-regular" id="_hour">
              {time}
            </h1>
          </div>

          <Users />
        </div>
      </div>

      <Login />
    </div>
  );
};

export default Timer;
