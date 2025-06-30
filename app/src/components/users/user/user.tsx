import { IUser } from "../users.types";
import { useUser } from "./user.hook";
import UserImg from "./user_1.jpg";

const User = (user: IUser) => {
  const { handleUserSelection } = useUser(user);

  return (
    <button
      onClick={handleUserSelection}
      value={user.username}
      className="user"
    >
      <img src={user.image || UserImg} alt={user.display_name} />
    </button>
  );
};
export default User;
