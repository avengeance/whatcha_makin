import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const MIN_EMAIL_LENGTH = 5;
  const MIN_PASSWORD_LENGTH = 6;

  const validCredential = credential.length >= MIN_EMAIL_LENGTH;
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
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
        <label id="email" className="input-label">
          <input
            type="text"
            value={email}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label id="password" className="input-label">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <div id="div-login-submit">
          <button type="submit"
          disabled={!validCredential || !validPassword}
          id="login-sbumit"
          >Log In</button>
        </div>
        <div className="demo-login">
          <a href="javascript:void(0)"
          onClick={handleDemoLogin}
          >Demo Login</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
