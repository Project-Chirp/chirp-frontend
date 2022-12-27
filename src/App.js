import "./App.css";
import Login from "./pages/Login.tsx";
import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
