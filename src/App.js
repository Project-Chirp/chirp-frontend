import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { PostContextProvider } from "./context/PostContext";

function App() {
  return (
    <PostContextProvider>
      <div className="App" style={{ display: "flex" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Timeline />} />
        </Routes>
      </div>
    </PostContextProvider>
  );
}

export default App;
