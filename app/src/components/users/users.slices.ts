import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsersState } from "./users.types";

const INITIAL_USER_STATE: IUsersState = {
  isLoading: true,
  users: [
    {
      display_name: "Clark Kent",
      language: null,
      layout: null,
      image: null,
      home_directory: "/home/superman",
      username: "superman",
      logged_in: false,
      session: "gnome",

      name: "superman",
      real_name: "Clark Kent",
    },
  ],
  selectedUser: null,
  isUserSelected: false,
  error: null,
};

export const UsersSlice = createSlice({
  name: "users",
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    selectUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
      state.isUserSelected = !!action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default UsersSlice.reducer;
export const { setUsers, setLoading, setError, selectUser } =
  UsersSlice.actions;
