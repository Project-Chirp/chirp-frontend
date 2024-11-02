import {
  Box,
  Link,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
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
  listItemText: { marginY: 0.5 },
  title: { fontWeight: "bold", paddingX: 2, paddingY: 1 },
};

const RelevantUsers = () => {
  const theme = useTheme();
  const relevantUser = useAppSelector((state) => state.posts.expandedPost);
  const currentUserId = useAppSelector((state) => state.user.userId);
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
              color={theme.typography.subtitle1.color}
              component={Routerlink}
              to={`/${relevantUser.username}`}
              underline="hover"
              variant="subtitle1"
            >
              {relevantUser.displayName}
            </Link>
          }
          secondary={
            <Typography
              color={theme.typography.subtitle2.color}
              component="span"
              variant="subtitle2"
            >
              {`@${relevantUser.username}`}
            </Typography>
          }
          sx={styles.listItemText}
        />
        {relevantUser.userId !== 0 &&
          relevantUser.userId !== currentUserId &&
          (relevantUser.followStatus ? (
            <FollowingButton
              onClick={() => dispatch(toggleFollow())}
              visitedUserId={relevantUser.userId}
            />
          ) : (
            <FollowButton
              onClick={() => dispatch(toggleFollow())}
              visitedUserId={relevantUser.userId}
            />
          ))}
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
