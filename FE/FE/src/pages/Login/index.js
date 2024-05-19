import { getUser } from "../../services/userServices";
import { setCookie } from "../../helpers/cookie";
import "./login.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const loginOptions = {
      username: username,
      password: password
    }
    const data = await getUser(loginOptions);
    console.log(data);
    if (data.token) {
      const time = 1;
  //     setCookie("user_id", data.id, time);
  //     setCookie("fullname", data.fullname, time);
  //     setCookie("username", data.username, time);
  //     setCookie("role", data.role, time);
      setCookie("token", data.token, time);
      setCookie("username", username, time);
      dispatch(checkAuthen(true));
      navigate("/");
    } else {
      Swal.fire({
        title: 'Username or password incorrect!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__wrap">
          <h3 className="login__title">Login</h3>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              className="login__input"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <label>Password:</label>
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
