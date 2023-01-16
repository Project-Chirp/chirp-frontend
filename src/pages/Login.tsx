import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loginButton, setLoginButton] = useState(false);
  // const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (displayName && password) {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  }, [displayName, password]);

  const submitLogin = async () => {
    if (password && displayName) {
      const myData = {
        password_hash: password,
        display_name: displayName,
      };

      await fetch("http://localhost:3001/api/appUsers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      }).then(function (response) {
        return response;
      });
    }
  };

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
        width={300}
      >
        Sign into your account
      </Typography>
      <TextField
        label="Display Name"
        margin="dense"
        value={displayName}
        onChange={(dName) => {
          setDisplayName(dName.target.value.substring(0, 20));
        }}
        type={"text"}
        variant="outlined"
        placeholder="Display Name"
        id="displayname"
      />
      <TextField
        label="Password"
        margin="dense"
        value={password}
        onChange={(pword) => setPassword(pword.target.value)}
        type={"password"}
        variant="outlined"
        placeholder="Password"
        id="password"
      />
      <Link
        variant="h6"
        component={RouterLink}
        to="/forgotpassword"
        underline="hover"
        color="inherit"
        fontSize={15}
        paddingTop={1}
        paddingBottom={1}
      >
        Forgot Password?
      </Link>
      <Link
        variant="h6"
        component={RouterLink}
        to="/register"
        underline="hover"
        color="inherit"
        fontSize={15}
        paddingBottom={10}
      >
        Need to sign up for an account?
      </Link>
      <Button
        disabled={loginButton === false}
        size={"large"}
        sx={{
          marginTop: 3,
          marginBottom: 2,
          borderRadius: 10,
          width: 253.4,
        }}
        color="primary"
        variant="contained"
        type="submit"
        onClick={() => submitLogin()}
      >
        Sign In
      </Button>
      {/* <Typography
        variant="h3"
        textAlign={"center"}
        fontWeight={500}
        fontSize={16}
        paddingTop={10}
        paddingBottom={5}
        width={300}
      >
        User is {isAuthenticated ? "Logged in" : "Not logged in"}
      </Typography>
      {isAuthenticated && (
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre> */}
      {/* )} */}
    </Box>
  );
};

export default Login;
