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
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { likePost, unlikePost } from "../../state/slices/postsSlice";
import { setExpandedPost } from "../../state/slices/postsSlice";
import { useEffect, useState } from "react";
import RepliesModal from "./RepliesModal";
import { Post } from "../../state/slices/postsSlice";

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
  actionCount: { fontWeight: "bold", paddingRight: 0.5 },
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

  useEffect(() => {
    const updatedExpandedPost = async () => {
      const backupFetch = await axios.get(
        "http://localhost:3001/api/posts/fetchPost",
        {
          params: {
            userId: user.userId,
            postId: urlParams.postId,
          },
        }
      );
      dispatch(setExpandedPost(backupFetch.data));
    };
    updatedExpandedPost();
  }, [dispatch, user.userId, urlParams.postId]);

  const likePost2 = async (postId: number, userId?: number) => {
    await axios.post("http://localhost:3001/api/posts/likePost", {
      postId,
      userId,
    });
    dispatch(likePost(postId));
  };

  const unlikePost2 = async (postId: number, userId?: number) => {
    await axios.delete("http://localhost:3001/api/posts/unlikePost", {
      params: {
        postId,
        userId,
      },
    });
    dispatch(unlikePost(postId));
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
          {post.timestamp}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={styles.actionsContainer}>
        <Box>
          <Button fullWidth sx={styles.actionButton}>
            <Typography component="span" sx={styles.actionCount}>
              1
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
              post.isLikedByCurrentUser
                ? unlikePost2(post.postId, user.userId)
                : likePost2(post.postId, user.userId);
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
