import "./App.css";
import Login from "./pages/Login.tsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
