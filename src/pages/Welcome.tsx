import { Button, Typography } from "@mui/material";
import React from "react";
// import logo from "../logo192.png";
import { Link as RouterLink } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Typography>Welcome to Tweeter</Typography>
      {/* <img src={logo} alt="Logo" /> */}
      <Button component={RouterLink} to="/login">
        Sign In
      </Button>
      <Typography>Don't have an account?</Typography>
      <Button component={RouterLink} to="/register">
        Create an Account
      </Button>
    </>
  );
};

export default Welcome;
