import {
  Avatar,
  Button,
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
  followButton: {
    boxShadow: "none",
    zIndex: 3,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray.light",
  },
  listItemText: {
    marginY: 0.5,
  },
  suDisplayName: {
    color: "black",
    fontWeight: "bold",
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
    ":hover": {
      backgroundColor: "#E9EBED",
    },
  },
  suUsername: {
    color: "rgba(0, 0, 0, 0.7)",
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

  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
                <Link component={Routerlink} to={"/profile"} underline="hover">
                  <Typography component={"span"} sx={styles.suDisplayName}>
                    {user.displayName}
                  </Typography>
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={styles.followButton}
              onClick={handlePropagation}
            >
              Follow
            </Button>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SuggestedUsers;
