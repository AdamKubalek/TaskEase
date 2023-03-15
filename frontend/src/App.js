import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RegisterForm from "./features/users/registration";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
};

export default App;
