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
    avatarUrl: "https://example.com/avatar2.jpg",
  },
  {
    id: 3,
    displayName: "Chad Son",
    username: "chad_son",
    avatarUrl: "https://example.com/avatar3.jpg",
  },
  {
    id: 4,
    displayName: "Michael Myers",
    username: "michael_myers",
    avatarUrl: "https://example.com/avatar4.jpg",
  },
  {
    id: 5,
    displayName: "Gilly Hobbs",
    username: "gilly_hobbs",
    avatarUrl: "https://example.com/avatar5.jpg",
  },
];

const SuggestedUsers = () => {
  return (
    <List sx={styles.list}>
      {usersData.map((user) => (
        <ListItem key={user.id} sx={styles.userContainer}>
          <ListItemAvatar>
            <Avatar
              component="button"
              alt={user.displayName}
              src={user.avatarUrl}
              sx={styles.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link underline="hover" sx={styles.listText}>
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
