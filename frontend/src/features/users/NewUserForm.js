import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../apiRequest";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!validUsername || !validPassword || password !== confirmPassword)
      return;
    const url = "http://localhost:3500/users";
    const optionsObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await apiRequest(url, optionsObj);
    if (!response) {
      setIsSuccess(true);
    } else {
      setErrMsg(response);
    }
  };

  return (
      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="hidden-btn">Sign up</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {formSubmitted && !validUsername && <p>Invalid username</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formSubmitted && !validEmail && <p>Invalid email</p>}
        <input
          autoFocus
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          autoFocus
          type="password"
          placeholder="Confirmed Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {formSubmitted && !validPassword && <p>Invalid password</p>}
        {formSubmitted && password !== confirmPassword && (
          <p>Passwords do not match</p>
        )} */}
        <button type="submit">Sign up</button>
        {errMsg && <p>{errMsg}</p>}
      </form>
  );
};

export default RegisterForm;
