import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container, Typography } from "@mui/material";

const DMViewProfile = () => {
  return (
    <div>
      <Container sx={{ display: "flex" }}>
        <Container sx={{ display: "flex" }}>
          <AccountCircleIcon />
          <Typography>Buzz</Typography>
        </Container>
        <Typography>Whats up</Typography>
      </Container>
    </div>
  );
};

export default DMViewProfile;
