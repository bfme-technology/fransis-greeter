import { useEffect, useState } from "react";
import { LoaderProps, LoaderType } from "./loader.types";
import Loader from "./loader";

const useLoader = (props: LoaderProps) => {
  const { message, isLoading, type } = props;
  const defaultType = LoaderType.SPINNER;

  const [loaderType, setLoaderType] = useState<LoaderType>(type || defaultType);
  useEffect(() => {
    if (!type) {
      setLoaderType(defaultType);
    }
  }, [type]);
  return {
    message,
    isLoading,
    type: loaderType,
  };
};

export default useLoader;
