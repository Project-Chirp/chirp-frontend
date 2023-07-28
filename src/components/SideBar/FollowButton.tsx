import { Box } from "@mui/material";
import React from "react";

const styles = {
  followButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
};

const FollowButton = () => {
  return <Box sx={styles.followButton}>Follow</Box>;
};

export default FollowButton;
