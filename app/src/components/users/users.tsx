import User from "./user/user";
import { useUserSelector } from "./users.selectors";

const Users = () => {
  const userState = useUserSelector();
  debugger;
  return (
    <div id="user-list">
      {userState.users.map((user) => (
        <User {...user} key={user.username} />
      ))}
    </div>
  );
};

export default Users;
