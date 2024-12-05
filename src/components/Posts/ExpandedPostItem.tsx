import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import {
  AddCommentOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  KeyboardBackspace,
  RepeatOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams, Link as Routerlink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { toggleLikePostRequest } from "../../utilities/postUtilities";
import UserAvatar from "../Common/UserAvatar";
import {
  toggleLikePost,
  setExpandedPost,
  Post,
} from "../../state/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import TooltipTimestamp from "../Common/TooltipTimestamp";
import { enqueueToast } from "../../state/slices/toastSlice";
import { RepliesModal } from "./RepliesModal";
import PostMenu from "./PostMenu";

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
    gap: 2,
    padding: 1,
  },
};

type ExpandedPostItemProps = {
  post: Post;
};

const ExpandedPostItem = ({ post }: ExpandedPostItemProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updatedExpandedPost = async () => {
      try {
        const backupFetch = await axios.get(
          "http://localhost:3001/api/posts/fetchPost",
          {
            params: {
              userId: user.userId,
              postId: urlParams.postId,
            },
          },
        );
        dispatch(setExpandedPost(backupFetch.data as Post));
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    };
    updatedExpandedPost();
  }, [dispatch, user.userId, urlParams.postId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post.postId}`);
    dispatch(enqueueToast({ message: "Post URL copied to clipboard!" }));
  };

  return (
    <Card sx={styles.card}>
      <Box sx={styles.topHeader}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspace color="secondary" />
        </IconButton>
        <Typography variant="h3">Post</Typography>
      </Box>
      <CardHeader
        action={<PostMenu isExpandedPost post={post} />}
        avatar={<UserAvatar username={post.username} />}
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
      />
      <CardContent>
        <Typography>{post.textContent}</Typography>
      </CardContent>
      {post.imagePath && (
        <CardMedia
          component="img"
          image={post.imagePath}
          sx={styles.cardMedia}
        />
      )}
      <Box sx={styles.timestampBox}>
        <TooltipTimestamp
          isEdited={Boolean(post.editedTimestamp)}
          timestamp={post.editedTimestamp || post.timestamp}
        />
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
            <RepeatOutlined />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCommentOutlined />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleLikePostRequest(
                post.isLikedByCurrentUser,
                post.postId,
                user.userId,
              );
              dispatch(toggleLikePost(post.postId));
            }}
            sx={post.isLikedByCurrentUser ? styles.likedIcon : undefined}
          >
            {post.isLikedByCurrentUser ? (
              <FavoriteOutlined />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <IconButton onClick={() => copyToClipboard()}>
            <ShareOutlined />
          </IconButton>
        </Stack>
      </CardActions>
      <RepliesModal onClose={() => setOpen(false)} open={open} post={post} />
    </Card>
  );
};

export default ExpandedPostItem;
