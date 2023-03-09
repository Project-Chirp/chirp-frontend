import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Register from "./pages/Register";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Welcome />;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
