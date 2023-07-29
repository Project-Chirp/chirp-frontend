import {
  Avatar,
  Box,
  Link,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../state/hooks";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import FollowButton from "./FollowButton";

const styles = {
  avatar: {
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
  followButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
  listItemText: { marginY: 0.5 },
  relevantUserContainer: {
    boxSizing: "border-box",
    border: "2px solid",
    borderColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
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
    fontSize: "0.875rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  ruTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingY: 1,
  },
  ruUsername: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "0.875rem",
  },
};

const RelevantUsers = () => {
  const relevantUser = useAppSelector((state) => state.posts.expandedPost);
  const navigate = useNavigate();

  return (
    <Box sx={styles.relevantUserContainer}>
      <Typography variant="h6" sx={styles.ruTitle}>
        Relevant People
      </Typography>
      <ListItemButton
        onClick={() => navigate(`/profile`)}
        sx={styles.ruContent}
      >
        <ListItemAvatar>
          <Avatar
            alt={relevantUser.displayName}
            sx={styles.avatar}
            component={Routerlink}
            to={"/profile"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link component={Routerlink} to={"/profile"} underline="hover">
              <Typography component={"span"} sx={styles.ruDisplayName}>
                {relevantUser.displayName}
              </Typography>
            </Link>
          }
          secondary={
            <Typography
              component={"span"}
              sx={styles.ruUsername}
            >{`@${relevantUser.username}`}</Typography>
          }
          sx={styles.listItemText}
        />
        <FollowButton />
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
