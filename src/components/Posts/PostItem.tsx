import {
  AddCommentOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  RepeatOutlined,
  ShareOutlined,
  Repeat,
} from "@mui/icons-material";
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
import { useRef, useState } from "react";
import { useNavigate, Link as Routerlink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  Post,
  toggleLikePost,
  setExpandedPost,
} from "../../state/slices/postsSlice";
import { enqueueToast } from "../../state/slices/toastSlice";
import toggleLikePostRequest from "../../utilities/postUtilities";
import useAxios from "../../utilities/useAxios";
import RepostMenu from "../Common/RepostMenu";
import TooltipTimestamp from "../Common/TooltipTimestamp";
import UserAvatar from "../Common/UserAvatar";
import PostMenu from "./PostMenu";
import { RepliesModal } from "./RepliesModal";

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
  const { sendRequest } = useAxios();
  const isRepost = post.originalPostContent && !post.textContent;
  const resolvedPostId = isRepost ? post.parentPostId : post.postId;

  const routeChange = () => {
    navigate(`/post/${resolvedPostId}`);
    dispatch(setExpandedPost(post));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/post/${resolvedPostId}`,
    );
    dispatch(enqueueToast({ message: "Post URL copied to clipboard!" }));
  };

  console.log(post);

  return (
    <Card sx={styles.card}>
      {isRepost && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#808080",
          }}
        >
          <RepeatOutlined sx={{ fontSize: "1rem" }} />
          <Link
            color={theme.typography.subtitle2.color}
            component={Routerlink}
            sx={{ paddingLeft: 0.5, fontSize: "0.8125rem" }}
            to={`/${post.username}`}
            underline="hover"
            variant="subtitle2"
          >
            Reposted by {post.displayName}
          </Link>
        </Box>
      )}
      <CardHeader
        action={<PostMenu post={post} />}
        avatar={<UserAvatar username={post.username} />}
        subheader={
          <TooltipTimestamp
            isEdited={Boolean(post.editedTimestamp)}
            timestamp={post.editedTimestamp || post.timestamp}
          />
        }
        subheaderTypographyProps={{ sx: styles.tooltipText }}
        title={
          <Box>
            <Link
              color={theme.typography.subtitle1.color}
              component={Routerlink}
              sx={styles.displayName}
              to={`/${post.username}`}
              underline="hover"
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
      />
      <CardActionArea onClick={() => routeChange()}>
        <CardContent>
          <Typography>
            {isRepost
              ? post.originalPostContent?.textContent
              : post.textContent}
          </Typography>
        </CardContent>
        {post.imagePath && (
          <CardMedia
            component="img"
            image={post.imagePath}
            sx={styles.cardMedia}
          />
        )}
      </CardActionArea>
      <CardActions>
        <Box sx={styles.cardActions}>
          <Button
            onClick={() => setOpenRepostMenu(true)}
            ref={repostMenuRef}
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
          {/* <RepostMenu
            isReposted={post.isRepostedByCurrentUser}
            open={openRepostMenu}
            postId={post.postId}
            ref={repostMenuRef}
            setCloseMenu={() => setOpenRepostMenu(false)}
          /> */}
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
            onClick={async () => {
              await toggleLikePostRequest(
                sendRequest,
                post.isLikedByCurrentUser,
                post.postId,
                user.userId,
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
