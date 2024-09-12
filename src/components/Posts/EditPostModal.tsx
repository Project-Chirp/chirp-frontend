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
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";
import UserAvatar from "../Common/UserAvatar";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import formatTimestamp from "../../utilities/formatTimestamp";
import axios from "axios";
import { updatePost } from "../../state/slices/postsSlice";

type EditPostModalProps = {
  onClose: () => void;
  open: boolean;
  postId: number;
  originalPostTextContent: string;
  originalPostTimestamp: string;
  prevEditedPostTimestamp: string;
};

const styles = {
  avatar: { paddingRight: 1.5 },
  dialog: {
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContentContainer: {
    padding: 2,
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
  },
  editPostHeader: {
    display: "flex",
  },
  paperProps: {
    overflow: "visible",
    borderRadius: 20,
  },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
  },
  textFieldContainer: { width: "100%", paddingTop: 2 },
  textField: { paddingBottom: 2 },
  titleText: {
    fontWeight: "bold",
    paddingLeft: 3,
  },
  userInfoText: {
    display: "flex",
    gap: 0.5,
  },
};

const EditPostModal = ({
  onClose,
  open,
  postId,
  originalPostTextContent,
  originalPostTimestamp,
  prevEditedPostTimestamp,
}: EditPostModalProps) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const existingPost = useAppSelector((state) =>
    state.posts.posts.find((post) => post.postId === postId)
  );
  const [postTextContent, setPostTextContent] = useState<string>(
    existingPost?.textContent || ""
  );

  const handleEdit = async () => {
    try {
      await axios.put("http://localhost:3001/api/posts/updatePost", {
        postId: postId,
        textContent: postTextContent,
        editedTimestamp: new Date(),
      });

      if (existingPost) {
        dispatch(
          updatePost({
            ...existingPost,
            textContent: postTextContent,
            editedTimestamp: new Date().toISOString(),
          })
        );
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
        <Box sx={styles.dialogContentContainer}>
          <Box sx={styles.editPostHeader}>
            <Box sx={styles.avatar}>
              <UserAvatar username={user.username} />
            </Box>
            <Box>
              <Box sx={styles.userInfoText}>
                <Typography variant="subtitle1">{user.username}</Typography>
                <Typography variant="subtitle2">{`@${user.displayName}`}</Typography>
              </Box>
              <Typography variant="body2">
                {
                  prevEditedPostTimestamp
                    ? formatTimestamp(prevEditedPostTimestamp, true)
                    : formatTimestamp(originalPostTimestamp)
                  // formatTimestamp(existingPost?.timestamp || "")
                }
              </Typography>
            </Box>
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
                      (prevContent) => prevContent + emoji.emoji
                    );
                  }}
                />
              </Stack>
              <Button
                size="small"
                type="submit"
                variant="contained"
                onClick={handleEdit}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
