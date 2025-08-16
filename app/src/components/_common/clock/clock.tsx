import ClockContainer from "./clock.styles";
import useTime from "./time/time.hook";

const Timer = () => {
  const { time, date, timeZone } = useTime();
  return (
    <ClockContainer>
      <div className="welcome clock">
        <p>
          <span>{date}</span>
          <span>|</span>
          <span>{timeZone}</span>
        </p>
        <h1 className="lilita-one-regular">{time}</h1>
      </div>
    </ClockContainer>
  );
};

export default Timer;
