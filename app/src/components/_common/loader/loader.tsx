import Skeleton from "react-loading-skeleton";
import useLoader from "./loader.hook";
import LoaderContainer from "./loader.styles";
import { LoaderProps, LoaderType } from "./loader.types";

const Loader = (props: LoaderProps) => {
  const { message, isLoading, type } = useLoader(props);

  if (!isLoading) return null;

  return (
    <LoaderContainer>
      {type == LoaderType.SKELETON && <Skeleton />}
      {type == LoaderType.SPINNER && (
        <>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <p>{message}</p>
        </>
      )}
    </LoaderContainer>
  );
};

export default Loader;
