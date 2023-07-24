import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  avatar: {
    border: "none",
    cursor: "pointer",
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray.light",
  },
  listText: {
    color: "black",
  },
  userContainer: {
    cursor: "pointer",
    height: "25%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    ":hover": {
      backgroundColor: "#E9EBED",
    },
  },
  followButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
  displayName: {
    fontWeight: "bold",
  },
};

const usersData = [
  {
    id: 1,
    displayName: "John Doe",
    username: "john_doe",
    avatarUrl: "https://example.com/avatar1.jpg",
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
    <List sx={styles.list}>
      {usersData.map((user) => (
        <ListItem key={user.id} sx={styles.userContainer}>
          <ListItemAvatar>
            <Avatar
              component="button"
              onClick={() => navigate("/coming-soon")}
              alt={user.displayName}
              sx={styles.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link
                underline="hover"
                target="_blank"
                href="/coming-soon"
                rel="noreferrer"
                sx={styles.listText}
              >
                {user.displayName}
              </Link>
            }
            secondary={`@${user.username}`}
            primaryTypographyProps={styles.displayName}
          />
          <ListItemSecondaryAction>
            <Button
              className="followButton"
              variant="contained"
              color="primary"
              size="small"
              sx={styles.followButton}
            >
              Follow
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestedUsers;
