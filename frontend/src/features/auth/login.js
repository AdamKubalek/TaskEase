import React, { useState, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const Login = () => {
  const API_URL = "http://localhost:3500/login";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      Cookies.set("token", data.token);
      const decodedToken = jwtDecode(data.token);
      Cookies.set("user", JSON.stringify(decodedToken.user));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <label htmlFor="hidden-btn">Login</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      {errMsg && <div>{errMsg}</div>}
    </form>
  );
};

export default Login;
