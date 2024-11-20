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
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AddCommentOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  RepeatOutlined,
  ShareOutlined,
  RateReview,
  Repeat,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  Post,
  toggleLikePost,
  toggleRepost,
  undoRepost,
} from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { setExpandedPost } from "../../state/slices/postsSlice";
import { useRef, useState } from "react";
import RepliesModal from "./RepliesModal";
import {
  toggleLikePostRequest,
  toggleRepostRequest,
} from "../../utilities/postUtilities";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import PostMenu from "./PostMenu";
import TooltipTimestamp from "../Common/TooltipTimestamp";
import { enqueueToast } from "../../state/slices/toastSlice";

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
  cardMedia: { maxWidth: 200, margin: "auto" },
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
  icon: { color: "black.main" },
  menu: { borderRadius: 2 },
  menuList: { padding: 0 },
  menuItem: { paddingX: 1.5, paddingY: 1 },
  tooltipText: {
    display: "inline-block",
  },
};

const PostItem = ({ post }: PostProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [openReplies, setOpenReplies] = useState(false);
  const [openRepostMenu, setOpenRepostMenu] = useState(false);
  const repostMenuRef = useRef<HTMLButtonElement>(null);

  const routeChange = () => {
    navigate(`/post/${post.postId}`);
    dispatch(setExpandedPost(post));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post.postId}`);
    dispatch(enqueueToast({ message: "Post URL copied to clipboard!" }));
  };

  const handleRepost = async () => {
    setOpenRepostMenu(false);
    const targetPostId =
      post.isRepost && post.parentPostId ? post.parentPostId : post.postId;

    await toggleRepostRequest(
      post.isRepostedByCurrentUser,
      targetPostId,
      user.userId
    );

    if (post.isRepostedByCurrentUser) {
      dispatch(
        undoRepost({
          parentPostId: targetPostId,
          repostedUsername: user.username,
        })
      );
    } else {
      dispatch(toggleRepost(post.postId));
    }
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<UserAvatar username={post.username} />}
        action={<PostMenu post={post} />}
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
            {post.isRepost && (
              <Link
                color={theme.typography.subtitle2.color}
                component={Routerlink}
                to={`/${post.repostedUsername}`}
                variant="subtitle2"
                sx={{ paddingLeft: 1 }}
                underline="hover"
              >
                Reposted by @{post.repostedUsername}
              </Link>
            )}
          </Box>
        }
        subheader={
          <TooltipTimestamp
            timestamp={post.editedTimestamp || post.timestamp}
            isEdited={Boolean(post.editedTimestamp)}
          />
        }
        subheaderTypographyProps={{ sx: styles.tooltipText }}
      />
      <CardActionArea onClick={() => routeChange()}>
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
      </CardActionArea>
      <CardActions>
        <Box sx={styles.cardActions}>
          <Button
            ref={repostMenuRef}
            onClick={() => setOpenRepostMenu(true)}
            startIcon={
              post.isLikedByCurrentUser ? <RepeatOutlined /> : <Repeat />
            }
            sx={
              post.isRepostedByCurrentUser
                ? styles.coloredButton
                : styles.defaultButton
            }
          >
            {post.numberOfReposts}
          </Button>
          <Menu
            anchorEl={repostMenuRef.current}
            open={openRepostMenu}
            onClose={() => setOpenRepostMenu(false)}
            slotProps={{
              paper: {
                sx: styles.menu,
              },
            }}
            MenuListProps={{ sx: styles.menuList }}
          >
            <MenuItem sx={styles.menuItem} onClick={handleRepost}>
              <ListItemIcon>
                <RepeatOutlined sx={styles.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
                {post.isRepostedByCurrentUser ? "Undo repost" : "Repost"}
              </ListItemText>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              onClick={() => setOpenRepostMenu(false)}
            >
              <ListItemIcon>
                <RateReview sx={styles.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
                Quote Post
              </ListItemText>
            </MenuItem>
          </Menu>
          <Button
            onClick={() => {
              setOpenReplies(true);
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
          <IconButton onClick={() => copyToClipboard()}>
            <ShareOutlined />
          </IconButton>
        </Box>
      </CardActions>
      <RepliesModal
        onClose={() => setOpenReplies(false)}
        open={openReplies}
        post={post}
      />
    </Card>
  );
};

export default PostItem;
