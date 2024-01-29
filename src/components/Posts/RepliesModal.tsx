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
  author: { fontSize: 14 },
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
  card: {
    padding: 0,
    boxShadow: "none",
  },
  cardContent: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: { maxWidth: 200, margin: "auto" },
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  displayName: { fontSize: 14, fontWeight: "bold" },
  dialogTitle: {
    paddingX: 0.5,
    paddingY: 0,
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
  mainContainer: {
    display: "flex",
  },
  moreButton: { paddingY: 0 },
  names: {
    display: "flex",
  },
  namesAndOption: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postContentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 3,
  },
  replyingText: {
    display: "flex",
    alignItems: "center",
  },
  replyingTo: {
    fontSize: 14,
  },
  textContent: {
    flex: "0 0 88%",
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
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
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.mainContainer}>
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
                  <Box sx={styles.names}>
                    <Typography sx={styles.displayName}>
                      {`${post.displayName} `}
                      <Typography
                        component="span"
                        sx={styles.username}
                      >{`@${post.username}`}</Typography>
                    </Typography>
                  </Box>
                  <IconButton sx={styles.moreButton}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Box sx={styles.postContentContainer}>
                  <Typography>{post.textContent}</Typography>
                </Box>
                <Box sx={styles.replyingText}>
                  <Typography variant="subtitle1" sx={styles.replyingTo}>
                    {`Replying to `}
                    <Typography
                      component="span"
                      color="primary"
                      sx={styles.author}
                    >{`@${post.username}`}</Typography>
                  </Typography>
                </Box>
              </Box>
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
