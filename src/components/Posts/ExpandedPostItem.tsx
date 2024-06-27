import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton/IconButton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardActions from "@mui/material/CardActions/CardActions";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toggleLikePost } from "../../state/slices/postsSlice";
import { setExpandedPost } from "../../state/slices/postsSlice";
import formatTimestamp from "../../utilities/formatTimestamp";
import { useEffect, useState } from "react";
import RepliesModal from "./RepliesModal";
import { Post } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import { toggleLikePostRequest } from "../../utilities/postUtilities";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import { useTheme } from "@mui/material/styles";

const styles = {
  actionButton: {
    color: "black.main",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  actionsContainer: {
    display: "flex",
    paddingX: 1,
    paddingY: 1,
  },
  actionCount: { fontWeight: "bold", paddingRight: 0.5 },
  backButton: { "&:hover": { backgroundColor: "transparent" } },
  card: {
    padding: 0,
    boxShadow: "none",
  },
  cardActions: {
    width: "100%",
  },
  cardMedia: { maxWidth: 200, margin: "auto" },
  headerTitle: {
    fontWeight: "bold",
  },
  likedIcon: {
    color: "primary.main",
  },
  timestampBox: {
    display: "flex",
    paddingLeft: 2,
    paddingY: 1,
  },
  topHeader: {
    alignItems: "center",
    display: "flex",
    paddingTop: 1,
  },
};

type ExpandedPostItemProps = {
  post: Post;
};

const ExpandedPostItem = ({ post }: ExpandedPostItemProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const urlParams = useParams();
  const [open, setOpen] = useState(false);
  const { sendRequest } = useAxios();

  useEffect(() => {
    const updatedExpandedPost = async () => {
      const backupFetch = await sendRequest({
        url: "/posts/fetchPost",
        method: "get",
        params: { userId: user.userId, postId: urlParams.postId },
      });
      dispatch(setExpandedPost(backupFetch as Post));
    };
    updatedExpandedPost();
  }, [dispatch, user.userId, urlParams.postId, sendRequest]);

  const navigate = useNavigate();

  return (
    <Card sx={styles.card}>
      <Box sx={styles.topHeader}>
        <IconButton onClick={() => navigate(-1)} sx={styles.backButton}>
          <KeyboardBackspaceIcon color="secondary" />
        </IconButton>
        <Typography variant="h2">Post</Typography>
      </Box>
      <CardHeader
        avatar={<UserAvatar username={post.username} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            color={theme.typography.subtitle1.color}
            component={Routerlink}
            to={`/${post.username}`}
            underline="hover"
            variant="subtitle1"
          >
            {post.displayName}
          </Link>
        }
        subheader={
          <Link
            color={theme.typography.subtitle2.color}
            component={Routerlink}
            to={`/${post.username}`}
            underline="none"
            variant="subtitle2"
          >
            @{post.username}
          </Link>
        }
      />
      <CardContent>
        <Typography>{post.textContent}</Typography>
      </CardContent>
      {post.imagePath && (
        <CardMedia
          sx={styles.cardMedia}
          component="img"
          image={post.imagePath}
        />
      )}
      <Box sx={styles.timestampBox}>
        <Typography component="span" variant="subtitle2">
          {formatTimestamp(post.timestamp)}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={styles.actionsContainer}>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              {post.numberOfReposts}
            </Typography>
            <Typography component="span">Reposts</Typography>
          </Button>
        </Box>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              {post.numberOfReplies}
            </Typography>
            <Typography component="span">Replies</Typography>
          </Button>
        </Box>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              {post.numberOfLikes}
            </Typography>
            <Typography component="span">Likes</Typography>
          </Button>
        </Box>
      </Box>
      <Divider variant="middle" />
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={styles.cardActions}
        >
          <IconButton>
            <RepeatOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCommentOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleLikePostRequest(
                post.isLikedByCurrentUser,
                post.postId,
                user.userId
              );
              dispatch(toggleLikePost(post.postId));
            }}
            sx={post.isLikedByCurrentUser ? styles.likedIcon : undefined}
          >
            {post.isLikedByCurrentUser ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Stack>
      </CardActions>
      <RepliesModal onClose={() => setOpen(false)} open={open} post={post} />
    </Card>
  );
};

export default ExpandedPostItem;
