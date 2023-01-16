import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profilepage" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
