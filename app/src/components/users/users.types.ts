export interface IUsersState {
  isLoading: boolean;
  users: IUser[];
  selectedUser: IUser | null; // The currently selected user, if any
  error: string | null;
  isUserSelected: boolean; // Indicates if a user is selected
}

export interface IUser {
  display_name: string;
  language: string | null;
  layout: string | null;
  image: string | null; // URL or path to the user's image
  home_directory: string;
  username: string;
  logged_in: boolean;
  session: string;
  name: string;
  real_name: string;
}
