import { LoaderProps } from "./loader.types";

const useLoader = (props: LoaderProps) => {
  const { message, isLoading, type } = props;

  return {
    message,
    isLoading,
    type,
  };
};

export default useLoader;
