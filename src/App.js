import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import PageLoader from "./pages/PageLoader";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [basicUserInfo, setBasicUserInfo] = useState({
    isLoading: true,
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

  if (isLoading || (isAuthenticated && basicUserInfo.isLoading)) {
    return (
      <div className="App" style={{ display: "flex" }}>
        <PageLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!basicUserInfo.username) {
    return <Register />;
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Timeline} />} />
        <Route
          path="/messages"
          element={<ProtectedRoute component={Messages} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
