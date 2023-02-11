import "./App.css";
import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
