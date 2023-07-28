import {
  Avatar,
  Button,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  avatar: {
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
    fontWeight: "bold",
    ":hover": {
      textDecoration: "underline",
    },
  },
  userContainer: {
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
    zIndex: 3,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
  },
  displayName: {
    fontWeight: "bold",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  suggestedUserContainer: {
    backgroundColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: "38%",
    width: "100%",
    overflow: "hidden",
  },
  suTitle: { fontWeight: "bold", paddingX: 2, paddingTop: 1 },
  suHeader: {
    width: "100%",
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
      <Box sx={styles.suHeader}>
        <Typography variant="h6" sx={styles.suTitle}>
          Who to follow
        </Typography>
      </Box>
      <Box sx={styles.listContainer}>
        <List sx={styles.list}>
          {usersData.map((user) => (
            <ListItemButton
              key={user.id}
              sx={styles.userContainer}
              onClick={() =>
                navigate(
                  `//${window.location.hostname}:${window.location.port}/profile`
                )
              }
            >
              <ListItemAvatar>
                <Avatar alt={user.displayName} sx={styles.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={styles.listText}>
                    {user.displayName}
                  </Typography>
                }
                secondary={`@${user.username}`}
                primaryTypographyProps={styles.displayName}
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
    </Box>
  );
};

export default SuggestedUsers;
