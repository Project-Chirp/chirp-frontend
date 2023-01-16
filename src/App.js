import "./App.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Welcome from "./pages/Welcome.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import { Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain="dev-8e2eney2zngtvaof.us.auth0.com"
        clientId="J1dv2HbpggopctXuZX7Y4i4LnZKJsP0t"
        redirectUri={window.location.origin}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Auth0Provider>
    </div>
  );
}

export default App;
