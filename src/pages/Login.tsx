import { Button, Link, TextField, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Typography>Sign into your account</Typography>
      <TextField
        margin="normal"
        type={"text"}
        variant="outlined"
        placeholder="Username"
        id="username"
      />
      <TextField
        margin="normal"
        type={"text"}
        variant="outlined"
        placeholder="Password"
        id="password"
      />
      <Link>Forgot Password?</Link>
      <Link component={RouterLink} to="/register">
        Need to sign up for an account?
      </Link>
      <Button>Sign In</Button>
    </>
  );
};

export default Login;
