import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Post } from "../../state/slices/postsSlice";
import ComposeReply from "./ComposeReply";

const styles = {
  card: {
    padding: 0,
    boxShadow: "none",
  },
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: {
    justifyContent: "space-between",
    paddingTop: 0,
  },
  textFieldContainer: {
    width: "100%",
    display: "flex",
  },
  textField: { paddingBottom: 2, paddingRight: 1 },
  postActions: {
    paddingLeft: 7.5,
    paddingBottom: 2,
  },
  postButton: {
    borderRadius: 5,
    height: 35,
    weight: 35,
  },
  topContainer: {
    display: "flex",
    padding: 2,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
  },
  dialogPaper: {
    borderRadius: 3,
  },
  replyingTo: {
    fontSize: 13,
    color: "gray",
  },
  displayName: { paddingRight: 1, fontSize: 14, fontWeight: "bold" },
  username: { fontSize: 14, color: "gray" },
  author: { paddingLeft: 0.5, fontSize: 13 },
  replyInfo: { display: "flex", paddingTop: 1, paddingBottom: 1 },
  cardMedia: { maxWidth: 200, margin: "auto" },
  cardContent: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    width: "100%",
    height: "80%",
    display: "flex",
    margin: 0,
  },
  avatarLineContainer: {
    width: "12%",
    display: "flex",
    flexDirection: "column",
    gap: 0.25,
    right: 2,
  },
  secondaryContainer: {
    width: "100%",
    height: "1.5rem",
    display: "flex",
    margin: 0,
  },
  addLineContainer: {
    width: "12%",
    display: "flex",
  },
  replyingText: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  avatarBox: {
    display: "flex",
    justifyContent: "center",
    padding: 1,
  },
  lineBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    paddingBottom: 1,
  },
  line: {
    height: "100%",
    width: "5%",
    backgroundColor: "lightgray",
  },
  namesAndOption: {
    height: "2rem",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  names: {
    display: "flex",
    marginTop: 1,
  },
  postContentContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 1,
    marginRight: 3,
  },
  textContent: {
    width: "88%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
};

type PostModalProps = {
  onClose: () => void;
  openModal: boolean;
  post: Post;
};

export const RepliesModal = ({ onClose, openModal, post }: PostModalProps) => {
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      sx={styles.dialog}
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent} className="cardContent">
            <Box sx={styles.mainContainer} className="mainContainer">
              <Box sx={styles.avatarLineContainer}>
                <Box sx={styles.avatarBox}>
                  <Avatar>CK</Avatar>
                </Box>
                <Box sx={styles.lineBox}>
                  <Box sx={styles.line}></Box>
                </Box>
              </Box>
              <Box sx={styles.textContent}>
                <Box sx={styles.namesAndOption} className="namesAndOption">
                  <Box sx={styles.names}>
                    <Typography
                      sx={styles.displayName}
                    >{`${post.displayName}`}</Typography>
                    <Typography
                      sx={styles.username}
                    >{`@${post.username}`}</Typography>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Box sx={styles.postContentContainer}>
                  <Typography>{post.textContent}</Typography>
                </Box>
                <Box sx={styles.replyingText} className="lime">
                  <Typography sx={styles.replyingTo}>Replying to </Typography>
                  <Typography
                    color={"primary"}
                    sx={styles.author}
                  >{`@${post.username}`}</Typography>
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
            placeholder={"Post your reply"}
            parentPostId={post.postId}
            onClose={onClose}
          />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RepliesModal;
