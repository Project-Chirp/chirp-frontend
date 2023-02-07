import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Timeline />} />
      </Routes>
    </div>
  );
}

export default App;
