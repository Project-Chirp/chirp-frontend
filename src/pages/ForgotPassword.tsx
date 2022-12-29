import { Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <Typography>Sorry, we can't help you yet</Typography>
      <Typography>
        Contact an admin for a password reset through admin@tweeter.ca
      </Typography>
      <Button
        component={RouterLink}
        to="/login"
        size={"large"}
        sx={{
          marginTop: 3,
          marginBottom: 2,
          borderRadius: 10,
        }}
        color="primary"
        variant="contained"
      >
        Go Back
      </Button>
    </>
  );
};

export default ForgotPassword;
