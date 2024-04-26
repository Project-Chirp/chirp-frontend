import {
  Box,
  Link,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import FollowingButton from "../Common/FollowingButton";
import { toggleFollow } from "../../state/slices/postsSlice";
import FollowButton from "../Common/FollowButton";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Relevant People
      </Typography>
      <ListItemButton onClick={() => navigate(`/${relevantUser.username}`)}>
        <ListItemAvatar>
          <UserAvatar username={relevantUser.username} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              color="inherit"
              component={Routerlink}
              to={`/${relevantUser.username}`}
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
            >{`@${relevantUser.username}`}</Typography>
          }
          sx={styles.listItemText}
        />
        {relevantUser.followStatus ? (
          <FollowingButton
            onClick={() => dispatch(toggleFollow(false))}
            visitedUserId={relevantUser.userId}
          />
        ) : (
          <FollowButton
            onClick={() => dispatch(toggleFollow(true))}
            visitedUserId={relevantUser.userId}
          />
        )}
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
