import LoaderContainer from "./loader.style";
import { ILoader } from "./loader.types";

const Loader = ({ message, isLoading }: ILoader) => {
  if (!isLoading) return <></>;
  return (
    <LoaderContainer>
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <p>{message}</p>
    </LoaderContainer>
  );
};

export default Loader;
