import { selectUser } from "./../users/users.slices";
import { useAppDispatch } from "./../../store/store";
import { useUserSelector } from "./../users/users.selectors";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic for handling login
  };
  const [majorClass, setMajorClass] = useState("show");
  const dispatch = useAppDispatch();
  const userState = useUserSelector();
  useEffect(() => {
    if (userState.selectedUser && userState.isUserSelected) {
      setMajorClass("hide");
    } else {
      setMajorClass("show");
    }
  }, [userState.selectedUser]);
  const pageShow = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(selectUser(null)); // Reset selected user
    // Logic to show the user list or go back to the user selection page
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic to handle password input
    console.log("Password entered:", event.target.value);
  };
  return {
    handleLogin,
    pageShow,
    majorClass,
    user: userState.selectedUser,
    handlePassword,
  };
};
