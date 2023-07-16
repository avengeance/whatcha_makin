import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [buttonColor, setButtonColor] = useState("grey");

  const MIN_EMAIL_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;

  const validEmail = email.length >= MIN_EMAIL_LENGTH;
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data && data.errors) {
      setErrors(data.errors);
    } else {
      setErrors(["The provided credentials are invalid"])
    }
    if(data.ok){
      closeModal();
    }

    setButtonColor(!validEmail || !validPassword ? "red" : "grey")
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("demo@aa.io", "password")).then(closeModal)
  }

  return (
    <div className="login-modal">
      <h1 id='login-text'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="label-container">
        <label id="email-modal" className="input-label">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors([])
            }}
            required
            placeholder="Email"
          />
        </label>
        <label id="password-modal" className="input-label">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors([])
            }}
            required
            placeholder="Password"
          />
        </label>
        </div>
        <div id="div-login-submit">
          <button type="submit"
            disabled={!validEmail || !validPassword}
            id="login-submit-modal"
          >Log In</button>
        </div>
        <div className="demo-login-modal">
          <a href="javascript:void(0)"
            onClick={handleDemoLogin}
          >Demo Login</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
