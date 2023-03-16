import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingUpIn from "./SingUpIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<SingUpIn />} />
    </Routes>
  );
};

export default App;
