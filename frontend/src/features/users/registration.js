import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../apiRequest";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
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
    <div className="App">
      <Header title="Todo List" />
      <main>
        <form className="regForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {formSubmitted && !validUsername && <p>Invalid username</p>}
          <label htmlFor="password">Password</label>
            <input
              autoFocus
              type="password"
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <label htmlFor="confirmedPassword">Confirmed Password</label>
            <input
              autoFocus
              type="password"
              placeholder="Confirmed Password"
              id="confirmedPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          {formSubmitted && !validPassword && <p>Invalid password</p>}
          {formSubmitted && password !== confirmPassword && (
            <p>Passwords do not match</p>
          )}
          <button type="submit">Register</button>
          {errMsg && <p>{errMsg}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterForm;
