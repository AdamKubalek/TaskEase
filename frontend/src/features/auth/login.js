import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate(); // <-- new hook from react-router-dom to navigate to other pages
  const dispatch = useDispatch(); // <-- new hook from react-redux to dispatch actions

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation(); // <-- new hook from RTK Query
  const errClass = errMsg ? "errmsg" : "offscreen"; // <-- new class for error message display

  useEffect(() => {
    userRef.current.focus(); // <-- new effect to focus on username input on mount and unmount
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]); // <-- new effect to clear error message when username or password changes

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap(); // <-- new login action with RTK Query and unwrap to get the response body from the server
      dispatch(setCredentials({ accessToken })); // <-- new dispatch action to set credentials in the store with the access token from the server
      setUsername(""); // <-- new clear username and password from state after login success to prevent autofill on logout and login
      setPassword("");
      navigate("/"); // <-- new navigate to home page after login success
    } catch (err) {
      if (!err.status) {
        setErrMsg("Network error. Please try again later.");
      } else if (err.status === 400) {
        setErrMsg("Invalid username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized. Please login again.");
      } else {
        setErrMsg(
          err.data?.message || "Unknown error. Please try again later."
        );
      }
      errRef.current.focus();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } // <-- new loading state for login

  return (
    <form className="login" onSubmit={handleSubmit}>
      <label htmlFor="hidden-btn">Login</label>
      <input
        type="text"
        placeholder="Login"
        ref={userRef}
        value={username}
        onChange={handleUserInput}
        autoComplete="off"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePwdInput}
        required
      />

      <button type="submit">Login</button>
      <div ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </div>
    </form>
  );
};

export default Login;
