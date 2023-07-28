import { Avatar, Box, Button, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";

const styles = {
  followButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
  relevantUserContainer: {
    border: "2px solid",
    borderColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: "12.5%",
    width: "100%",
    overflow: "hidden",
  },
  ruContent: {
    display: "flex",
    flexDirection: "row",
    paddingX: 2,
    paddingY: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#E9EBED",
    },
    border: "none",
    cursor: "pointer",
  },
  ruDisplayName: {
    fontWeight: "bold",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  ruHeader: {
    width: "100%",
  },
  ruNames: { marginLeft: 2, textAlign: "left" },
  ruTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingTop: 1,
  },
  ruUsername: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
};

const RelevantUsers = () => {
  const relevantUser = useAppSelector((state) => state.expandedPost);
  const navigate = useNavigate();
  const handleFollowButton = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box sx={styles.relevantUserContainer}>
      <Box sx={styles.ruHeader}>
        <Typography variant="h6" sx={styles.ruTitle}>
          Relevant People
        </Typography>
      </Box>
      <ListItemButton
        onClick={() =>
          navigate(
            `//${window.location.hostname}:${window.location.port}/profile`
          )
        }
        sx={styles.ruContent}
      >
        <Box sx={styles.userInfo}>
          <Avatar />
          <Box sx={styles.ruNames}>
            <Typography sx={styles.ruDisplayName}>
              {relevantUser.displayName}
            </Typography>
            <Typography
              sx={styles.ruUsername}
            >{`@${relevantUser.username}`}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={styles.followButton}
          onClick={handleFollowButton}
        >
          Follow
        </Button>
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
