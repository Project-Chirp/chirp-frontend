import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useState } from "react";
import axios from "axios";
import { appendPost } from "../../state/slices/postsSlice";

const styles = {
  card: {
    padding: 0,
    boxShadow: "none",
  },
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: {
    justifyContent: "space-between",
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
    justifyContent: "space-between",
  },
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    padding: 1,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
  },
};

type PostModalProps = {
  onClose: () => void;
  openModal: boolean;
};

export const RepliesModal = ({ onClose, openModal }: PostModalProps) => {
  const post = useAppSelector((state) => state.post);
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const reply = await axios.post(
        "http://localhost:3001/api/posts/postReply",
        {
          userId: user.userId,
          parentPostId: post.postId,
          textContent,
        }
      );
      setPostTextContent("");
      dispatch(
        appendPost({
          ...reply.data,
          username: user.username,
          displayName: user.displayName,
        })
      );
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
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
          <CardHeader
            avatar={<Avatar>CK</Avatar>}
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{ fontWeight: "bold" }}
            sx={{ paddingBottom: 0 }}
            title={`${post.displayName} `}
            subheader={`@${post.username}`}
          />
          <CardContent
            sx={{
              width: 400,
              paddingLeft: 9,
              "&:last-child": { paddingBottom: 0 },
            }}
          >
            <Typography>{post.textContent}</Typography>
            <Box display={"flex"} sx={{ paddingTop: 2 }}>
              <Typography sx={{ fontSize: 13 }}>Replying to </Typography>
              <Typography
                color={"primary"}
                sx={{ paddingLeft: 0.5, fontSize: 13 }}
              >{`@${post.username}`}</Typography>
            </Box>
          </CardContent>
          {post.imagePath && (
            <CardMedia
              sx={{ maxWidth: 200, margin: "auto" }}
              component="img"
              image={post.imagePath}
            />
          )}
          <form onSubmit={onSubmit}>
            <Box sx={styles.compostPostContainer}>
              <Box sx={styles.topContainer}>
                <Box sx={styles.avatarIcon}>
                  <Avatar />
                </Box>
                <Box sx={styles.textFieldContainer}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    id="standard-multiline-static"
                    multiline
                    onChange={(e) => setPostTextContent(e.target.value)}
                    placeholder={"Post your reply!"}
                    sx={styles.textField}
                    value={postTextContent}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                  />
                  <Button
                    disabled={!postTextContent.trim()}
                    size="small"
                    sx={styles.postButton}
                    type="submit"
                    variant="contained"
                  >
                    Post
                  </Button>
                </Box>
              </Box>

              <Box sx={styles.postActions}>
                <Stack direction="row">
                  <IconButton size="small">
                    <AddPhotoAlternateOutlinedIcon />
                  </IconButton>
                  <IconButton size="small">
                    <EmojiEmotionsOutlinedIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RepliesModal;
