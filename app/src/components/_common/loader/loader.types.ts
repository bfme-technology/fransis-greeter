export enum LoaderType {
  SKELETON = "skeleton",
  SPINNER = "spinner",
}

export interface LoaderProps {
  message?: string;
  isLoading: boolean;
  type?: LoaderType;
}
