import { Button } from "@mui/material";
import React from "react";

const styles = {
  followButton: {
    boxShadow: "none",
    backgroundColor: "primary.main",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#1E9964", // could be primary.dark
    },
  },
};

const FollowButton = () => {
  const handleFollowButton = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={styles.followButton}
      onClick={handleFollowButton}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
