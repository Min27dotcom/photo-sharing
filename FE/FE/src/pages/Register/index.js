import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userServices";
import "./register.scss";
import Swal from "sweetalert2";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentPassword !== confirmPassword){
      Swal.fire({
        title: 'Confirm Password incorrect',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }

    const username = e.target.elements.username.value;
    const password = currentPassword;
    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.value;
    const location = e.target.elements.location.value;
    const description = e.target.elements.description.value;
    const occupation = e.target.elements.occupation.value;

    const options = {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      location: location,
      description: description,
      occupation: occupation
    };

    const processRegister = await createUser(options);

    if(processRegister.message === "Register Succesfully"){
      Swal.fire({
        title: 'Register success!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } 
      });
     } else if(processRegister.message === "User already exist!"){
      Swal.fire({
        title: 'Username already exists!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/register");
        } 
      });
    }
  };

  return (
    <>
      <div className="register">
        <div className="register__wrap">
          <h3 className="register__title">Register</h3>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              className="register__input"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <label>Password:</label>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {setCurrentPassword(e.target.value)}}
              required
            />
            <label>Confirm Password:</label>
            <input
              className="register__input"
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              required
            />
            <label>First Name:</label>
            <input
              className="register__input"
              type="text"
              name="first_name"
              placeholder="First Name"
              required
            />
            <label>Last Name:</label>
                <input
                  className="register__input"
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                />

            <label>Location:</label>
            <input
              className="register__input"
              type="text"
              name="location"
              placeholder="Location"
              required
            />
            <label>Description:</label>
            <input
              className="register__input"
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <label>Occupation:</label>
            <input
              className="register__input"
              type="text"
              name="occupation"
              placeholder="Occupation"
              required
            />

            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
