import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
