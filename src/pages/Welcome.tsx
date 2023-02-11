import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const styles = {
  loginButtons: {
    marginTop: 3,
    marginBottom: 2,
    borderRadius: 10,
    width: 253.4,
  },
};

const Welcome = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  function callApi() {
    axios
      .get("http://localhost:3001/")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  }

  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get("http://localhost:3001/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
        size="large"
        sx={styles.loginButtons}
        color="primary"
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        Take me to Tweeter
      </Button>
      <Button
        size="large"
        sx={styles.loginButtons}
        color="primary"
        variant="contained"
        onClick={() => logout()}
      >
        Log out
      </Button>
      <Button
        size="large"
        sx={styles.loginButtons}
        color="primary"
        variant="contained"
        onClick={callApi}
      >
        Call API
      </Button>
      <Button
        size="large"
        sx={styles.loginButtons}
        color="primary"
        variant="contained"
        onClick={callProtectedApi}
      >
        Call Protected API
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
