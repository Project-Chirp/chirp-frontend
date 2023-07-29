import {
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import FollowButton from "./FollowButton";

const styles = {
  avatar: {
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
  displayName: {
    fontWeight: "bold",
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray.light",
  },
  listItemText: { marginY: 0.5 },
  suDisplayName: {
    color: "black",
    fontWeight: "bold",
    fontSize: "0.875rem",
    ":hover": {
      textDecoration: "underline",
    },
  },
  suggestedUserContainer: {
    boxSizing: "border-box",
    border: "2px solid",
    borderColor: "gray.light",
    backgroundColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "hidden",
  },
  suTitle: { fontWeight: "bold", paddingX: 2, paddingY: 1 },
  userContainer: {
    height: "25%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ":hover": {
      backgroundColor: "#E9EBED",
    },
  },
  suUsername: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: "0.875rem",
  },
};

const usersData = [
  {
    id: 1,
    displayName: "John Doe",
    username: "john_doe",
  },
  {
    id: 2,
    displayName: "Jane Smith",
    username: "jane_smith",
  },
  {
    id: 3,
    displayName: "Chad Son",
    username: "chad_son",
  },
  {
    id: 4,
    displayName: "Michael Myers",
    username: "michael_myers",
  },
];

const SuggestedUsers = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.suggestedUserContainer}>
      <Typography variant="h6" sx={styles.suTitle}>
        Who to follow
      </Typography>
      <List sx={styles.list}>
        {usersData.map((user) => (
          <ListItemButton
            key={user.id}
            sx={styles.userContainer}
            onClick={() => navigate(`/profile`)}
          >
            <ListItemAvatar>
              <Avatar
                alt={user.displayName}
                sx={styles.avatar}
                component={Routerlink}
                to={"/profile"}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  component={Routerlink}
                  to={"/profile"}
                  underline="hover"
                  sx={styles.suDisplayName}
                >
                  {user.displayName}
                </Link>
              }
              secondary={
                <Typography
                  component={"span"}
                  sx={styles.suUsername}
                >{`@${user.username}`}</Typography>
              }
              sx={styles.listItemText}
            />
            <FollowButton />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SuggestedUsers;
