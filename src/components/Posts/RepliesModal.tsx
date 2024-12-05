import {
  Box,
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
import UserAvatar from "../Common/UserAvatar";
import ComposeReply from "./ComposeReply";

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
  dialog: {
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContent: {
    overflow: "visible",
    paddingX: 1,
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
  paperProps: {
    overflow: "visible",
    borderRadius: 20,
  },
  postContent: {
    padding: 0,
    display: "flex",
    overflow: "visible",
  },
  postMedia: { maxWidth: 200, margin: "auto" },
  postText: {
    paddingRight: 3,
    paddingBottom: 0.5,
  },
  textContent: {
    flex: "0 0 88%",
    display: "flex",
    flexDirection: "column",
  },
  username: { fontSize: 14 },
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
      PaperProps={{ style: styles.paperProps }}
    >
      <DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.postContent}>
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
            <Typography sx={styles.postText}>{post.textContent}</Typography>
            <Typography>
              Replying to
              <Typography component="span" color="primary">
                {` @${post.username}`}
              </Typography>
            </Typography>
          </Box>
        </Box>
        {post.imagePath && (
          <Box sx={styles.postMedia} component="img" src={post.imagePath} />
        )}
        <ComposeReply
          placeholder="Post your reply"
          parentPostId={post.postId}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RepliesModal;
