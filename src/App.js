import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline.tsx";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <NavBar />
      <Routes>
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Timeline />} />
      </Routes>
    </div>
  );
}

export default App;
