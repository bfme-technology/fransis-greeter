import styled from "@emotion/styled";
import shutterBackground from "./shutter.background.jpg";
const ShutterContainer = styled.div`
  & {
    background: url(${shutterBackground});
    background-size: contain;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;

    .clock {
      position: absolute;
      bottom: 30px;
      left: 30px;
    }
    .feed {
      width: 45vw;
      right: 30px;
      top: 30px;
      height: 40vh;
      overflow: auto;
      position: absolute;
    }
  }
`;

export default ShutterContainer;
