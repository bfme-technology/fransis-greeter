import Users from "./../users/users";
// import logo from "./logo.svg";
import Login from "./../login/login";
import useLanding from "./landing.hook";
import Timer from "@common/clock/clock";

const Landing = () => {
  const { majorClass } = useLanding();
  return (
    <div className="container">
      <div className="logo-wrapper"></div>
      <div className={`major ${majorClass}`}>
        <div className="greeting">
          <Timer />
          <Users />
        </div>
      </div>

      <Login />
    </div>
  );
};

export default Landing;
