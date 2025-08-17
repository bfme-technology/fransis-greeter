import { selectUser, setLogin } from "./../users/users.slices";
import { useAppDispatch } from "./../../store/store";
import { useUserSelector } from "./../users/users.selectors";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      setLogin({
        username: username,
        password: password,
      })
    );
  };

  const [majorClass, setMajorClass] = useState("show");
  const dispatch = useAppDispatch();
  const userState = useUserSelector();
  useEffect(() => {
    if (userState.selectedUser && userState.isUserSelected) {
      setMajorClass("hide");
      setUsername(userState.selectedUser.name);
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
    console.log("Password entered:", event.target.value);
    if (password != event.target.value) {
      setPassword(event.target.value);
    }
  };

  return {
    handleLogin,
    pageShow,
    majorClass,
    user: userState.selectedUser,
    handlePassword,
  };
};
