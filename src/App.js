import "./App.css";
import { Route, Routes } from "react-router-dom";
import Messages from "./pages/Messages.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
