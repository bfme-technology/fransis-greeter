import styled from "@emotion/styled";

const CardWidgetContainer = styled.div`
  & {
    border-bottom: 1px solid #e0e0e0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 24px 0;

    .card-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      img {
        border-radius: 12px;
        max-width: 220px;
        height: auto;
        transition: transform 0.2s;
        &:hover {
          transform: scale(1.03);
        }
      }
    }
    .card-right {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 12px;

      h3 {
        color: #fff;
        margin: 0 0 8px 0;
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      p {
        color: #e0e0e0;
        font-size: 1rem;
        margin: 0;
        line-height: 1.5;
      }
    }
  }
`;

export default CardWidgetContainer;
