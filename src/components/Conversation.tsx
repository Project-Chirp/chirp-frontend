import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Typography } from "@mui/material";

const DMViewProfile = () => {
  return (
    <div>
      <Box sx={{ padding: "10px", display: "flex" }}>
        <AccountCircleIcon sx={{ fontSize: 40 }} />
        <Box sx={{ flexDirection: "column" }}>
          <Typography>Username</Typography>
          <Box>
            <Typography sx={{}}>Hey</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DMViewProfile;
