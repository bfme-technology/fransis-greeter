import { useAppSelector } from "store/store";
import { IUsersState } from "./users.types";

export const useUserSelector = () => {
  const state = useAppSelector((state) => state.users);
  return state as IUsersState;
};
