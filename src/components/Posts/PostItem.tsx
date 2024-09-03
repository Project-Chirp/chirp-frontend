import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AddCommentOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  RepeatOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, toggleLikePost } from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { setExpandedPost } from "../../state/slices/postsSlice";
import { useState } from "react";
import RepliesModal from "./RepliesModal";
import { toggleLikePostRequest } from "../../utilities/postUtilities";
import formatTimestamp from "../../utilities/formatTimestamp";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import PostMenu from "./PostMenu";

type PostProps = {
  post: Post;
};

const styles = {
  card: {
    boxShadow: "none",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  coloredButton: {
    color: "primary.main",
  },
  defaultButton: {
    color: "gray.main",
    "&:hover": {
      color: "primary.main",
    },
  },
  displayName: {
    paddingRight: 0.5,
  },
};

const PostItem = ({ post }: PostProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const routeChange = () => {
    const path = `/post/${post.postId}`;
    navigate(path);
    dispatch(setExpandedPost(post));
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<UserAvatar username={post.username} />}
        action={
          <PostMenu
            authorId={post.userId}
            postId={post.postId}
            postTextContent={post.textContent}
            postTimeStamp={post.timestamp}
            prevEditedPostTimestamp={post.editedTimestamp}
          />
        }
        title={
          <Box>
            <Link
              color={theme.typography.subtitle1.color}
              component={Routerlink}
              to={`/${post.username}`}
              underline="hover"
              sx={styles.displayName}
              variant="subtitle1"
            >
              {post.displayName}
            </Link>
            <Link
              color={theme.typography.subtitle2.color}
              component={Routerlink}
              to={`/${post.username}`}
              underline="none"
              variant="subtitle2"
            >
              @{post.username}
            </Link>
          </Box>
        }
        subheader={
          post.editedTimestamp
            ? formatTimestamp(post.editedTimestamp, true)
            : formatTimestamp(post.timestamp)
        }
        subheaderTypographyProps={{ color: theme.typography.subtitle2.color }}
      />
      <CardActionArea onClick={() => routeChange()}>
        <CardContent>
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
        <Box sx={styles.cardActions}>
          <Button startIcon={<RepeatOutlined />} sx={styles.defaultButton}>
            {post.numberOfReposts}
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            startIcon={<AddCommentOutlined />}
            sx={styles.defaultButton}
          >
            {post.numberOfReplies}
          </Button>
          <Button
            onClick={() => {
              toggleLikePostRequest(
                post.isLikedByCurrentUser,
                post.postId,
                user.userId
              );
              dispatch(toggleLikePost(post.postId));
            }}
            startIcon={
              post.isLikedByCurrentUser ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )
            }
            sx={
              post.isLikedByCurrentUser
                ? styles.coloredButton
                : styles.defaultButton
            }
          >
            {post.numberOfLikes}
          </Button>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
      </CardActions>
      <RepliesModal onClose={() => setOpen(false)} open={open} post={post} />
    </Card>
  );
};

export default PostItem;
