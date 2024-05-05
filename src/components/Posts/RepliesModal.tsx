import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Post } from "../../state/slices/postsSlice";
import ComposeReply from "./ComposeReply";
import UserAvatar from "../Common/UserAvatar";

const styles = {
  avatarBox: {
    display: "flex",
    justifyContent: "center",
    padding: 1,
  },
  avatarLineContainer: {
    display: "flex",
    flex: "1 0 12%",
    flexDirection: "column",
    gap: 0.25,
  },
  card: { paddingX: 1 },
  cardContent: {
    padding: 0,
    display: "flex",
  },
  cardMedia: { maxWidth: 200, margin: "auto" },
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderRightWidth: "3px",
  },
  lineBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 1,
  },
  moreButton: { padding: 0.5 },
  namesAndOption: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postContent: {
    paddingRight: 3,
    paddingBottom: 0.5,
  },
  textContent: {
    flex: "0 0 88%",
    display: "flex",
    flexDirection: "column",
  },
};

type PostModalProps = {
  onClose: () => void;
  open: boolean;
  post: Post;
};

export const RepliesModal = ({ onClose, open, post }: PostModalProps) => {
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      scroll="paper"
      sx={styles.dialog}
    >
      <DialogTitle>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.avatarLineContainer}>
              <Box sx={styles.avatarBox}>
                <UserAvatar username={post.username} />
              </Box>
              <Box sx={styles.lineBox}>
                <Divider orientation="vertical" sx={styles.line} />
              </Box>
            </Box>
            <Box sx={styles.textContent}>
              <Box sx={styles.namesAndOption}>
                <Typography variant="subtitle1">
                  {post.displayName}
                  <Typography component="span" variant="subtitle2">
                    {` @${post.username}`}
                  </Typography>
                </Typography>
                <IconButton size="small" sx={styles.moreButton}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography sx={styles.postContent}>
                {post.textContent}
              </Typography>
              <Typography>
                Replying to
                <Typography component="span" color="primary">
                  {` @${post.username}`}
                </Typography>
              </Typography>
            </Box>
          </CardContent>
          {post.imagePath && (
            <CardMedia
              sx={styles.cardMedia}
              component="img"
              image={post.imagePath}
            />
          )}
          <ComposeReply
            placeholder="Post your reply"
            parentPostId={post.postId}
            onClose={onClose}
          />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RepliesModal;
