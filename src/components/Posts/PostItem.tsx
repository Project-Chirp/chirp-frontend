import { Card, CardContent, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar/Avatar";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton/IconButton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardActions from "@mui/material/CardActions/CardActions";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Post } from "./PostList";
import axios from "axios";
import { usePostContext } from "../../context/PostContext";
import { useDispatch } from "react-redux";
import { updatePost } from "../../state/slices/postSlice";

const styles = {
  card: {
    marginBottom: 2,
  },
  cardActions: {
    width: "100%",
  },
  actionNumbers: {
    paddingLeft: 1,
  },
};

type PostProps = {
  post: Post;
};

const likePost = async (userId: number, postId: number) => {
  await axios.post("http://localhost:3001/api/posts/likePost", {
    postId,
    userId,
  });
};

const unlikePost = async (userId: number, postId: number) => {
  await axios.delete("http://localhost:3001/api/posts/unlikePost", {
    params: {
      postId,
      userId,
    },
  });
};

const PostItem = ({ post }: PostProps) => {
  // const { updatePost } = usePostContext();

  const dispatch = useDispatch();

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
      <CardActionArea>
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
          <IconButton
            onClick={() => {
              post.isLikedByCurrentUser
                ? unlikePost(1, post.postId)
                : likePost(1, post.postId);
              const updatedPost = {
                ...post,
                isLikedByCurrentUser: !post.isLikedByCurrentUser,
                numberOfLikes: post.isLikedByCurrentUser
                  ? post.numberOfLikes - 1
                  : post.numberOfLikes + 1,
              };
              dispatch(updatePost(updatedPost));
            }}
          >
            {post.isLikedByCurrentUser ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <Typography sx={styles.actionNumbers}>
              {post.numberOfLikes}
            </Typography>
          </IconButton>
          <IconButton>
            <AddCommentOutlinedIcon />
            <Typography sx={styles.actionNumbers}>1</Typography>
          </IconButton>
          <IconButton>
            <RepeatOutlinedIcon />
            <Typography sx={styles.actionNumbers}>1</Typography>
          </IconButton>
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PostItem;
