import styled from "@emotion/styled";

const ClockContainer = styled.div`
  & {
    position: relative;
    text-shadow: 2px 2px 1px #000;
    .date {
      width: 30vw;
    }
  }
`;

export default ClockContainer;
