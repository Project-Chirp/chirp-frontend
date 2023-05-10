import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import PageLoader from "./pages/PageLoader";
import Profile from "./pages/Profile";
import "./App.css";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/slices/userSlice";
import { PostContextProvider } from "./context/PostContext";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const { user, setUser } = useUserContext();

  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3001/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response.data));
        // console.log(user.username);
        // setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [getAccessTokenSilently, dispatch]);

  if (isLoading || (isAuthenticated && user.isLoading)) {
    return (
      <div className="App" style={{ display: "flex" }}>
        <PageLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!user.username) {
    return <Register />;
  }

  return (
    <PostContextProvider>
      <div className="App" style={{ display: "flex" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Timeline} />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
        </Routes>
      </div>
    </PostContextProvider>
  );
}

export default App;
