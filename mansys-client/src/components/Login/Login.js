import "../../styles//Login.css";
import React, { useState } from "react";
import { signIn } from "../../actions/login";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleOnSubmit = async (event) => {
      dispatch(signIn(dataForm, navigate))
  };

  const handleOnChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const username = useSelector(state => state.auth.username)
  if(username){
    return <Navigate to="/"/>
  }

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <div></div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name"
                value={dataForm.username}
                onChange={handleOnChange}
                name="username"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                value={dataForm?.password}
                onChange={handleOnChange}
              />
            </div>
            <button className="button login__submit" onClick={handleOnSubmit}>
              <span className="button__text">Log In</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="social-login">
            <h3>Manufacturing Management System</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
