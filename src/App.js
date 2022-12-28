import "./App.css";
import Login from "./pages/Login.tsx";
import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
