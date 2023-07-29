import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar/Avatar";
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
import {
  setExpandedPost,
  updateExpandedPost,
} from "../../state/slices/expandedPostSlice";
import formatTimestamp from "../../utilities/formatTimestamp";
import { useEffect, useState } from "react";
import RepliesModal from "./RepliesModal";
import { Post } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";

const styles = {
  actionButton: {
    color: "black",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  actionsContainer: {
    display: "flex",
    paddingX: 1,
    paddingY: 1,
  },
  actionCount: { fontWeight: "bold" },
  actionTitles: {
    paddingLeft: 0.5,
  },
  backButton: { "&:hover": { backgroundColor: "transparent" } },
  card: {
    padding: 0,
    boxShadow: "none",
  },
  cardActions: {
    width: "100%",
  },
  cardContent: { width: 400 },
  cardMedia: { maxWidth: 200, margin: "auto" },
  headerTitle: {
    fontWeight: "bold",
  },
  likedIcon: {
    color: "primary.main",
  },
  timestamp: {
    fontSize: 14.5,
    color: "#a4a8ab",
  },
  timestampBox: {
    display: "flex",
    paddingLeft: 2,
    paddingY: 1,
  },
  topHeader: {
    display: "flex",
    alignItems: "center",
  },
};

type ExpandedPostItemProps = {
  post: Post;
};

const ExpandedPostItem = ({ post }: ExpandedPostItemProps) => {
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

  const likePost = async (postId: number, userId?: number) => {
    await sendRequest({
      url: "/posts/likePost",
      method: "post",
      data: {
        userId,
        postId,
      },
    });
    const updatedPost = {
      ...post,
      isLikedByCurrentUser: !post.isLikedByCurrentUser,
      numberOfLikes: post.isLikedByCurrentUser
        ? post.numberOfLikes - 1
        : post.numberOfLikes + 1,
    };
    dispatch(updateExpandedPost(updatedPost));
  };

  const unlikePost = async (postId: number, userId?: number) => {
    await sendRequest({
      url: "/posts/unlikePost",
      method: "delete",
      params: {
        postId,
        userId,
      },
    });
    const updatedPost = {
      ...post,
      isLikedByCurrentUser: !post.isLikedByCurrentUser,
      numberOfLikes: post.isLikedByCurrentUser
        ? post.numberOfLikes - 1
        : post.numberOfLikes + 1,
    };
    dispatch(updateExpandedPost(updatedPost));
  };

  const navigate = useNavigate();

  return (
    <Card sx={styles.card}>
      <Box style={styles.topHeader}>
        <IconButton onClick={() => navigate(-1)} sx={styles.backButton}>
          <KeyboardBackspaceIcon color="secondary" />
        </IconButton>
        <Typography style={styles.headerTitle}>Post</Typography>
      </Box>
      <CardHeader
        avatar={<Avatar>CK</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.displayName} `}
        subheader={`@${post.username}`}
      />
      <CardContent sx={styles.cardContent}>
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
        <Typography component="span" sx={styles.timestamp}>
          {formatTimestamp(post.timestamp)}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={styles.actionsContainer}>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              1
            </Typography>
            <Typography component="span" sx={styles.actionTitles}>
              Reposts
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              1
            </Typography>
            <Typography component="span" sx={styles.actionTitles}>
              Replies
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              {post.numberOfLikes}
            </Typography>
            <Typography component="span" sx={styles.actionTitles}>
              Likes
            </Typography>
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
              post.isLikedByCurrentUser
                ? unlikePost(post.postId, user.userId)
                : likePost(post.postId, user.userId);
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
