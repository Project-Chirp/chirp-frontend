import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Welcome />;
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Timeline />} />
      </Routes>
    </div>
  );
}

export default App;
