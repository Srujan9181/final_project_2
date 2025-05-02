import React, { useState, useEffect } from "react";
import userSignupStyles from "../styles/userSignup.module.css";
import AuthImage from "../assets/Authentication.png";
import MainLogo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import signupService from "../services/index.js";

function Signup() {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "admin",
    password: "",
    confirmPassword: "",
    check: checked,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.firstname.trim().length === 0 ||
      formData.lastname.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0 ||
      formData.confirmPassword.trim().length === 0 ||
      checked === false
    ) {
      alert("Please fill all the fields");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      alert('password and confirm password did not match');
      return;
    }
    try {
      const res = await signupService(formData);
      console.log(res);
      if (res.user) {
        window.location.href = "/login";
      } else {
        alert(res.message || "Signup Failed");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          role: "admin",
          password: "",
          confirmPassword: "",
        });
        setChecked(false);
      }
    } catch (err) {
      console.log(err);
      alert("signin failed");
    }
  };

  return (
    <div className={userSignupStyles.signupContainer}>
      <div className={userSignupStyles.signupLeft}>
        <img className={userSignupStyles.mainLogo} src={MainLogo} alt="mainlogo" />
        <div className={userSignupStyles.formContainer}>
          <h2>Sign in to your Plexify</h2>
          <br />
          <br />
          <div>
            <label htmlFor="fn" className={userSignupStyles.formLabel}>
              First name
            </label>
            <input
              name="firstname"
              value={formData.firstname}
              type="text"
              className={userSignupStyles.formInput}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="ln" className={userSignupStyles.formLabel}>
              Last name
            </label>
            <input
              name="lastname"
              value={formData.lastname}
              type="text"
              className={userSignupStyles.formInput}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="mail" className={userSignupStyles.formLabel}>
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              className={userSignupStyles.formInput}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="pass" className={userSignupStyles.formLabel}>
              Password
            </label>
            <input
              type="password"
              className={userSignupStyles.formInput}
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="cp" className={userSignupStyles.formLabel}>
              Confirm password
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
              className={userSignupStyles.formInput}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={userSignupStyles.termsCheck}>
            <label htmlFor="t&c" className={userSignupStyles.termsLabel}>
              <input
                type="checkbox"
                id="t&c"
                checked={checked}
                className={userSignupStyles.checkboxInput}
                onChange={() => {
                  setChecked(true);
                }}
              />
              By creating an account, I agree to our Terms of use
              <br /> and Privacy Policy
            </label>
          </div>

          <div className={userSignupStyles.signupButtonContainer}>
            <button
              onClick={(e) => {
                console.log(formData);
                handleSubmit(e);
              }}
              className={userSignupStyles.signupButton}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
      <div className={userSignupStyles.signupRight}>
        <img
          className={userSignupStyles.authImage}
          src={AuthImage}
          alt="Authentication Image"
        />
      </div>
      <p className={userSignupStyles.recaptchaText}>
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Services Apply
      </p>
    </div>
  );
}

export default Signup;
