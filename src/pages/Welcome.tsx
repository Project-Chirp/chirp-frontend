import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
// import logo from "../logo192.png";
import { Link as RouterLink } from "react-router-dom";

const Welcome = () => {
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
        component={RouterLink}
        to="/login"
      >
        Sign In
      </Button>
      <Link
        variant="h6"
        component={RouterLink}
        to="/register"
        underline="hover"
        color="inherit"
        fontSize={15}
        margin="dense"
      >
        Don't have an account?
      </Link>
      <Button
        size={"large"}
        sx={{
          marginBottom: 2,
          borderRadius: 10,
          width: 253.4,
        }}
        color="primary"
        variant="contained"
        component={RouterLink}
        to="/register"
      >
        Create an Account
      </Button>
    </Box>
  );
};

export default Welcome;
