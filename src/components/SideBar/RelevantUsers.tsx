import {
  Box,
  Link,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../state/hooks";
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
  displayName: {
    fontWeight: "bold",
    color: "black",
    fontSize: "0.875rem",
  },
  listItemText: { marginY: 0.5 },
  title: {
    fontWeight: "bold",
    paddingX: 2,
    paddingY: 1,
  },
  username: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "0.875rem",
  },
};

const RelevantUsers = () => {
  const relevantUser = useAppSelector((state) => state.posts.expandedPost);
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Relevant People
      </Typography>
      <ListItemButton onClick={() => navigate(`/${relevantUser.userId}`)}>
        <ListItemAvatar>
          <UserAvatar username={relevantUser.username} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              color="inherit"
              component={Routerlink}
              to={`/${relevantUser.userId}`}
              underline="hover"
            >
              <Typography component="span" sx={styles.displayName}>
                {relevantUser.displayName}
              </Typography>
            </Link>
          }
          secondary={
            <Typography
              component="span"
              sx={styles.username}
            >{`@${relevantUser.userId}`}</Typography>
          }
          sx={styles.listItemText}
        />
        <FollowButton />
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
