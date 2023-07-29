import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
import useAxios from "./utilities/useAxios";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { sendRequest } = useAxios();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await sendRequest({ url: "/users", method: "get" });
        dispatch(setUser(response));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [dispatch, sendRequest]);

  if (isLoading || (isAuthenticated && user.isLoading)) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!user.username) {
    return <Register />;
  }

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={Timeline} />} />
      <Route
        path="/messages"
        element={<ProtectedRoute component={Messages} />}
      />
      <Route
        path="/messages/:userId1/:userId2"
        element={<ProtectedRoute component={DirectMessage} />}
      />
      <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
      <Route
        path="/post/:postId"
        element={<ProtectedRoute component={ExpandedPost} />}
      />
    </Routes>
  );
}

export default App;
