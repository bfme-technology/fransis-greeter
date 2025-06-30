import { useAppDispatch } from "store/store";
import { IUser } from "../users.types";
import { selectUser } from "../users.slices";

export const useUser = (user: IUser) => {
  const dispatch = useAppDispatch();
  const handleUserSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(selectUser(user));
    const lightdm = (window as any).lightdm;
    if (lightdm) {
      if (lightdm.authentication_user) {
        lightdm.cancel_authentication();
      }
    }
  };

  return {
    handleUserSelection,
  };
};
