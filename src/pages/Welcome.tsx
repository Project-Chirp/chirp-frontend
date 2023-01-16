import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
// import logo from "../logo192.png";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Welcome = () => {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  function callApi() {
    axios
      .get("http://localhost:3000/")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  }

  async function callProtectedApi() {
    const token = await getAccessTokenSilently();
    console.log(token);
    // axios
    //   .get("http://localhost:3000/protected")
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error.message));
  }

  return (
    <Box
      zIndex={2}
      display={"flex"}
      flexDirection={"column"}
      maxWidth={400}
      alignItems={"center"}
      justifyContent={"center"}
      margin={"auto"}
      marginTop={5}
      padding={3}
      width={1000}
    >
      <Typography
        variant="h1"
        textAlign={"center"}
        fontWeight={700}
        fontSize={32}
        paddingTop={10}
        paddingBottom={5}
      >
        Welcome to Tweeter
      </Typography>
      <img
        width={250}
        height={250}
        src={process.env.PUBLIC_URL + "/logojade.png"}
        alt="Logo"
      />
      <Button
        size={"large"}
        sx={{
          marginTop: 3,
          marginBottom: 2,
          borderRadius: 10,
          width: 253.4,
        }}
        color="primary"
        variant="contained"
        onClick={loginWithRedirect}
      >
        Take me to Tweeter
      </Button>

      <Typography>
        User is {isAuthenticated ? "Logged in" : "Not logged in"}
      </Typography>
      {isAuthenticated && (
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </Box>
  );
};

export default Welcome;
