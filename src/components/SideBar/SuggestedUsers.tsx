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
import { useNavigate, Link as Routerlink } from "react-router-dom";
import FollowButton from "./FollowButton";

const styles = {
  avatar: {
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
  container: {
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
  displayName: {
    color: "black",
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  listItemText: { marginY: 0.5 },
  title: { fontWeight: "bold", paddingX: 2, paddingY: 1 },
  username: {
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
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Who to Follow
      </Typography>
      <List disablePadding>
        {usersData.map((user) => (
          <ListItemButton key={user.id} onClick={() => navigate(`/profile`)}>
            <ListItemAvatar>
              <Avatar
                alt={user.displayName}
                component={Routerlink}
                sx={styles.avatar}
                to="/profile"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  component={Routerlink}
                  to="/profile"
                  underline="hover"
                  sx={styles.displayName}
                >
                  {user.displayName}
                </Link>
              }
              secondary={
                <Typography
                  component="span"
                  sx={styles.username}
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
