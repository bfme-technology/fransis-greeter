import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./../components/users/users.slices";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    users: UsersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
): TSelected => {
  return useSelector(selector);
};
