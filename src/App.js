import "./App.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Welcome from "./pages/Welcome.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
