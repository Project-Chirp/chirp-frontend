import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import PageLoader from "./pages/PageLoader";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [basicUserInfo, setBasicUserInfo] = useState({
    userId: undefined,
    username: undefined,
    displayName: undefined,
  });

  useEffect(() => {
    const getBasicUserInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          "http://localhost:3001/api/appUsers/basicUserInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setBasicUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBasicUserInfo();
  }, [getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!basicUserInfo.username) {
    {
      console.log("IN RENDER", basicUserInfo);
    }
    return <Register />;
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
