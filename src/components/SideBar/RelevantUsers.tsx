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
import {
  selectExpandedPost,
  toggleFollow,
} from "../../state/slices/postsSlice";
import { selectCurrentUserId } from "../../state/slices/userSlice";
import FollowButton from "../Common/FollowButton";
import FollowingButton from "../Common/FollowingButton";
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

const RelevantUsers = () => {
  const theme = useTheme();
  const relevantPost = useAppSelector(selectExpandedPost);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant="h6">
        Relevant People
      </Typography>
      <ListItemButton onClick={() => navigate(`/${relevantPost.username}`)}>
        <ListItemAvatar>
          <UserAvatar username={relevantPost.username} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              color={theme.typography.subtitle1.color}
              component={Routerlink}
              to={`/${relevantPost.username}`}
              underline="hover"
              variant="subtitle1"
            >
              {relevantPost.displayName}
            </Link>
          }
          secondary={
            <Typography
              color={theme.typography.subtitle2.color}
              component="span"
              variant="subtitle2"
            >
              {`@${relevantPost.username}`}
            </Typography>
          }
          sx={styles.listItemText}
        />
        {relevantPost.userId !== 0 &&
          relevantPost.userId !== currentUserId &&
          (relevantPost.followStatus ? (
            <FollowingButton
              onClick={() => dispatch(toggleFollow())}
              visitedUserId={relevantPost.userId}
            />
          ) : (
            <FollowButton
              onClick={() => dispatch(toggleFollow())}
              visitedUserId={relevantPost.userId}
            />
          ))}
      </ListItemButton>
    </Box>
  );
};

export default RelevantUsers;
