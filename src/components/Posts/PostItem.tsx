import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
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
import {
  Post,
  toggleLikePost,
  setExpandedPost,
} from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import RepliesModal from "./RepliesModal";
import { toggleLikePostRequest } from "../../utilities/postUtilities";
import formatTimestamp from "../../utilities/formatTimestamp";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";

type PostProps = {
  post: Post;
};

const styles = {
  card: {
    boxShadow: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "gray.light",
    },
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
  media: { maxWidth: 200, margin: "auto" },
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

  const handleModalOpen = (event: React.MouseEvent) => {
    setOpen(true);
    event.stopPropagation();
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    toggleLikePostRequest(post.isLikedByCurrentUser, post.postId, user.userId);
    dispatch(toggleLikePost(post.postId));
    event.stopPropagation();
  };

  const handleCardClick = () => {
    routeChange();
  };

  return (
    <>
      <Card sx={styles.card} onClick={handleCardClick}>
        <CardHeader
          avatar={
            <UserAvatar
              onClick={(event) => event.stopPropagation()}
              username={post.username}
            />
          }
          action={
            <IconButton onClick={(event) => event.stopPropagation()}>
              <MoreVertIcon />
            </IconButton>
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
                onClick={(event) => event.stopPropagation()}
              >
                {post.displayName}
              </Link>
              <Link
                color={theme.typography.subtitle2.color}
                component={Routerlink}
                to={`/${post.username}`}
                underline="none"
                variant="subtitle2"
                onClick={(event) => event.stopPropagation()}
              >
                @{post.username}
              </Link>
            </Box>
          }
          subheader={formatTimestamp(post.timestamp)}
          subheaderTypographyProps={{ color: theme.typography.subtitle2.color }}
        />

        <CardContent>
          <Typography>{post.textContent}</Typography>
        </CardContent>
        {post.imagePath && (
          <CardMedia
            sx={styles.media}
            component="img"
            image={post.imagePath}
            onClick={(event) => event.stopPropagation()}
          />
        )}

        <CardActions>
          <Box sx={styles.cardActions}>
            <Button
              startIcon={<RepeatOutlinedIcon />}
              sx={styles.defaultButton}
              onClick={(event) => event.stopPropagation()}
            >
              {post.numberOfReposts}
            </Button>
            <Button
              onClick={handleModalOpen}
              startIcon={<AddCommentOutlinedIcon />}
              sx={styles.defaultButton}
            >
              {post.numberOfReplies}
            </Button>
            <Button
              onClick={handleLikeClick}
              startIcon={
                post.isLikedByCurrentUser ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
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
            <IconButton onClick={(event) => event.stopPropagation()}>
              <ShareOutlinedIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      <RepliesModal onClose={() => setOpen(false)} open={open} post={post} />
    </>
  );
};

export default PostItem;
