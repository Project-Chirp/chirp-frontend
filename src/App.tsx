import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import PageLoader from "./pages/PageLoader";
import Profile from "./pages/Profile";
import "./styles/App.css";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { setUser } from "./state/slices/userSlice";
import ExpandedPost from "./pages/ExpandedPost";
import Messages from "./pages/Messages";
import DirectMessage from "./pages/DirectMessage";
import ComingSoon from "./pages/ComingSoon";
import Toast from "./components/Common/Toast";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const userIsLoading = useAppSelector((state) => state.user.isLoading);
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

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
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [getAccessTokenSilently, dispatch]);

  if (isLoading || (isAuthenticated && userIsLoading)) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!username) {
    return <Register />;
  }

  return (
    <>
      <Toast />
      <Routes>
        <Route element={<ProtectedRoute component={Timeline} />} path="/" />
        <Route
          element={<ProtectedRoute component={Messages} />}
          path="/messages"
        />
        <Route
          element={<ProtectedRoute component={DirectMessage} />}
          path="/messages/:userId1/:userId2"
        />
        <Route
          element={<ProtectedRoute component={Profile} />}
          path="/:username"
        />
        <Route
          element={<ProtectedRoute component={ExpandedPost} />}
          path="/post/:postId"
        />
        <Route
          element={<ProtectedRoute component={ComingSoon} />}
          path="/coming-soon"
        />
      </Routes>
    </>
  );
}

export default App;
