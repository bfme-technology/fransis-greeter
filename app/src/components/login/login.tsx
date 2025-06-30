import { useUserSelector } from "./../users/users.selectors";
import { useLogin } from "./login.hook";
import UserImage from "./../users/user/user_1.jpg";
const Login = () => {
  const { handleLogin, pageShow, majorClass, user } = useLogin();
  const UserState = useUserSelector();

  return (
    <div className={`entry_page ${majorClass}`}>
      <form className="login" onSubmit={handleLogin}>
        <img src={user?.image || UserImage} id="urs_image" />
        <input type="hidden" value="user" id="usr_selected" />

        <h2 id="urs_name_display"></h2>
        <div className="input_options">
          <p id="error" className="error-message"></p>
          <input
            type="password"
            id="usr_password"
            placeholder="Enter your password"
          />
        </div>
        <button className="simulate_link" onClick={pageShow} type="reset">
          Go Back to All Users
        </button>
      </form>
    </div>
  );
};

export default Login;
