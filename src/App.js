import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/home" element={<Timeline />} />
      </Routes>
    </div>
  );
}

export default App;
