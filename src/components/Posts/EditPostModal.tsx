import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  IconButton,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setExpandedPost, updatePost } from "../../state/slices/postsSlice";
import { Post } from "../../types/posts";
import useAxios from "../../utilities/useAxios";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";
import UserAvatar from "../Common/UserAvatar";

type EditPostModalProps = {
  isExpandedPost: boolean;
  onClose: () => void;
  open: boolean;
  post: Post;
};

const styles = {
  paperProps: {
    overflow: "visible",
    borderRadius: 20,
  },
  dialog: {
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    paddingLeft: 3,
  },
  dialogContentContainer: {
    display: "flex",
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
  },
  avatar: { paddingRight: 1.5 },
  textFieldContainer: { width: "100%", paddingTop: 0.5 },
  textField: { paddingBottom: 2 },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
  },
};

const EditPostModal = ({
  isExpandedPost,
  onClose,
  open,
  post,
}: EditPostModalProps) => {
  const username = useAppSelector((state) => state.user.username);
  const { sendRequest } = useAxios();
  const dispatch = useAppDispatch();
  const [postTextContent, setPostTextContent] = useState(post.textContent);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await sendRequest(
        {
          method: "PUT",
          data: {
            postId: post.postId,
            textContent: postTextContent,
          },
        },
        "posts/editPost",
      );
      const editedPost = {
        ...post,
        editedTimestamp: new Date().toString(),
        textContent: postTextContent,
      };
      if (isExpandedPost) {
        dispatch(setExpandedPost(editedPost));
      } else {
        dispatch(updatePost(editedPost));
      }
      onClose?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{ style: styles.paperProps }}
      scroll="paper"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography sx={styles.titleText}>Edit Post</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Box sx={styles.dialogContentContainer}>
            <Box sx={styles.avatar}>
              <UserAvatar username={username} />
            </Box>
            <Box sx={styles.textFieldContainer}>
              <TextField
                fullWidth
                hiddenLabel
                multiline
                onChange={(e) => setPostTextContent(e.target.value)}
                sx={styles.textField}
                value={postTextContent}
                variant="standard"
              />
              <Box sx={styles.postActions}>
                <Stack direction="row">
                  <IconButton size="small">
                    <AddPhotoAlternateOutlinedIcon />
                  </IconButton>
                  <EmojiPickerIconButton
                    onEmojiClick={(emoji: EmojiClickData) => {
                      setPostTextContent(
                        (prevContent) => prevContent + emoji.emoji,
                      );
                    }}
                  />
                </Stack>
                <Button
                  disabled={!postTextContent.trim()}
                  size="small"
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
