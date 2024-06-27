import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import FollowButton from "../Common/FollowButton";
import UserAvatar from "../Common/UserAvatar";

const styles = {
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
  listItemText: { marginY: 0.5 },
  title: { fontWeight: "bold", paddingX: 2, paddingY: 1 },
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
  const theme = useTheme();
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
              <UserAvatar username="" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  color={theme.typography.subtitle1.color}
                  component={Routerlink}
                  to="/"
                  underline="hover"
                  variant="subtitle1"
                >
                  {user.displayName}
                </Link>
              }
              secondary={
                <Typography
                  color={theme.typography.subtitle2.color}
                  component="span"
                  variant="subtitle2"
                >
                  {`@${user.username}`}
                </Typography>
              }
              sx={styles.listItemText}
            />
            {/* TODO: Update to render Following Button as well */}
            <FollowButton onClick={() => {}} visitedUserId={NaN} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SuggestedUsers;
