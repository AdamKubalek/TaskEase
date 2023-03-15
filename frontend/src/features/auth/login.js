// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import Cookies from "js-cookie";

// const Login = () => {
//   const API_URL = "http://localhost:3500/login";
//   const history = useHistory();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setErrMsg("");
//   }, [username, password]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       Cookies.set("token", data.token);
//       const decodedToken = jwtDecode(data.token);
//       Cookies.set("user", JSON.stringify(decodedToken.user));
//       history.push("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit">Login</button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };

// export default Login;
