import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar/Avatar";
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
import { Post, updatePost } from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { setExpandedPost } from "../../state/slices/expandedPostSlice";

type PostProps = {
  post: Post;
};

const PostItem = ({ post }: PostProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const styles = {
    card: {
      boxShadow: "none",
    },
    cardActions: {
      width: "100%",
    },
    likeIcon: {
      color: post.isLikedByCurrentUser ? "primary.main" : "gray.main",
      "&:hover": {
        color: "primary.main",
      },
    },
    tempIcon: {
      color: "gray.main",
      "&:hover": {
        color: "primary.main",
      },
    },
  };

  const likePost = async (postId: number, userId?: number) => {
    await axios.post("http://localhost:3001/api/posts/likePost", {
      postId,
      userId,
    });
    const updatedPost = {
      ...post,
      isLikedByCurrentUser: !post.isLikedByCurrentUser,
      numberOfLikes: post.isLikedByCurrentUser
        ? post.numberOfLikes - 1
        : post.numberOfLikes + 1,
    };
    dispatch(updatePost(updatedPost));
  };

  const unlikePost = async (postId: number, userId?: number) => {
    await axios.delete("http://localhost:3001/api/posts/unlikePost", {
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
    dispatch(updatePost(updatedPost));
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/post/${post.postId}`;
    navigate(path);
    dispatch(setExpandedPost(post));
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar>CK</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.displayName} @${post.username}`}
        subheader={post.timestamp}
      />
      <CardActionArea onClick={() => routeChange()}>
        <CardContent sx={{ width: 400 }}>
          <Typography>{post.textContent}</Typography>
        </CardContent>
        {post.imagePath && (
          <CardMedia
            sx={{ maxWidth: 200, margin: "auto" }}
            component="img"
            image={post.imagePath}
          />
        )}
      </CardActionArea>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={styles.cardActions}
        >
          <Button
            onClick={() => {
              post.isLikedByCurrentUser
                ? unlikePost(post.postId, user.userId)
                : likePost(post.postId, user.userId);
            }}
            startIcon={
              post.isLikedByCurrentUser ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )
            }
            sx={styles.likeIcon}
          >
            {post.numberOfLikes}
          </Button>
          <Button startIcon={<AddCommentOutlinedIcon />} sx={styles.tempIcon}>
            1
          </Button>
          <Button startIcon={<RepeatOutlinedIcon />} sx={styles.tempIcon}>
            1
          </Button>
          <Button startIcon={<ShareOutlinedIcon />} sx={styles.tempIcon} />
        </Stack>
      </CardActions>
      <Divider light />
    </Card>
  );
};

export default PostItem;
