import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Menu,
  MenuItem,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  Post,
  deletePost,
  toggleLikePost,
} from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { setExpandedPost } from "../../state/slices/postsSlice";
import { useState } from "react";
import RepliesModal from "./RepliesModal";
import { toggleLikePostRequest } from "../../utilities/postUtilities";
import formatTimestamp from "../../utilities/formatTimestamp";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import axios from "axios";

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
  menu: {
    borderRadius: 4,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
};

const PostItem = ({ post }: PostProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/post/${post.postId}`;
    navigate(path);
    dispatch(setExpandedPost(post));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:3001/api/posts/deletePost`,
        {
          data: {
            postId: post.postId,
          },
        }
      );
      dispatch(deletePost(post.postId));
      return result.data;
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      handleMenuClose();
    }
  };

  const handleTemporary = () => {
    handleMenuClose();
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<UserAvatar username={post.username} />}
        action={
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: styles.menu,
              }}
            >
              {user.userId === post.userId && (
                <>
                  <MenuItem sx={styles.menuItem} onClick={handleTemporary}>
                    <EditIcon />
                    <Typography>Edit Post</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDelete} sx={styles.menuItem}>
                    <DeleteIcon color="error" />
                    <Typography color="error">Delete Post</Typography>
                  </MenuItem>
                </>
              )}
              <MenuItem sx={styles.menuItem} onClick={handleTemporary}>
                <LinkIcon />
                <Typography>Copy Link</Typography>
              </MenuItem>
            </Menu>
          </>
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
        subheader={formatTimestamp(post.timestamp)}
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
          <Button startIcon={<RepeatOutlinedIcon />} sx={styles.defaultButton}>
            {post.numberOfReposts}
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            startIcon={<AddCommentOutlinedIcon />}
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
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Box>
      </CardActions>
      <RepliesModal onClose={() => setOpen(false)} open={open} post={post} />
    </Card>
  );
};

export default PostItem;
