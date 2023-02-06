import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";

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
      >
        Take me to Tweeter
      </Button>
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
      >
        Log out
      </Button>
    </Box>
  );
};

export default Welcome;
