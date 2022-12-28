import "./App.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
