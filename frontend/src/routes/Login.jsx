import React, { useEffect, useState } from "react";
import loginStyles from "../styles/loginPage.module.css";
import AuthImage from "../assets/Authentication.png";
import MainLogo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/index.js";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      alert("Please fill in all fields");
    } else {
      try {
        const result = await login(formData);
        console.log(result);
        setToken(result.token);
        localStorage.setItem("token", result.token);
        if (result.token) {
          localStorage.setItem("currentadmin", JSON.stringify(result.user));
          navigate("/dashboard", { replace: true });
          return;
        } else {
          alert("Invalid Credentials");
          setFormData({ email: "", password: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  return (
    <div className={loginStyles.loginPage}>
      <div className={loginStyles.loginLeft}>
        <img className={loginStyles.mainLogo} src={MainLogo} alt="mainlogo" />
        <div className={loginStyles.loginInputs}>
          <h2>Sign in to your Plexify</h2>
          <br />
          <br />
          <div className={loginStyles.emailInput}>
            <label htmlFor="mail" className={loginStyles.inputLabel}>
              Username
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              className={loginStyles.textInput}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={loginStyles.passwordInput}>
            <label htmlFor="pass" className={loginStyles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              className={loginStyles.textInput}
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={loginStyles.loginButton}>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className={loginStyles.submitButton}
            >
              Log in
            </button>
          </div>
          <div className={loginStyles.signUpLink}>
            <p>
              Don't have an account?{" "}
              <Link className={loginStyles.linkText} to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={loginStyles.loginRight}>
        <img
          className={loginStyles.authImage}
          src={AuthImage}
          alt="Authentication Image"
        />
      </div>
      <p className={loginStyles.footerText}>
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Services Apply
      </p>
    </div>
  );
}

export default Login;
