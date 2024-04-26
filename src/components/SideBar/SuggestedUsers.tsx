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
import FollowButton from "../Common/FollowButton";
import { useAppDispatch } from "../../state/hooks";
import { toggleFollow } from "../../state/slices/postsSlice";

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

// TODO: Return followStatus from the follow table as well for every user.
const usersData = [
  {
    id: 1,
    displayName: "John Doe",
    username: "john_doe",
    followStatus: false,
  },
  {
    id: 2,
    displayName: "Jane Smith",
    username: "jane_smith",
    followStatus: false,
  },
  {
    id: 3,
    displayName: "Chad Son",
    username: "chad_son",
    followStatus: false,
  },
  {
    id: 4,
    displayName: "Michael Myers",
    username: "michael_myers",
    followStatus: false,
  },
];

const SuggestedUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Who to Follow
      </Typography>
      <List disablePadding>
        {usersData.map((user) => (
          <ListItemButton key={user.id} onClick={() => navigate(`/`)}>
            <ListItemAvatar>
              <Avatar
                alt={user.displayName}
                component={Routerlink}
                sx={styles.avatar}
                to="/"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  component={Routerlink}
                  to="/"
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
            {/* TODO: update to render Following Button as well */}
            <FollowButton onClick={() => {}} visitedUserId={NaN} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SuggestedUsers;
