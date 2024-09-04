import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  IconButton,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
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
  openModal: boolean;
  postId: number;
  originalPostTextContent: string;
  originalPostTimeStamp: string;
  prevEditedPostTimestamp: string;
};

const styles = {
  dialog: {
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContent: { overflow: "visible" },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    paddingLeft: 1,
  },
  paperProps: {
    overflow: "visible",
    borderRadius: 20,
  },
  avatarIcon: { paddingRight: 1.5 },
  editPostContainer: {
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
  },
  editPostHeader: {
    display: "flex",
  },
  textFieldContainer: { width: "100%", paddingTop: 2 },
  textField: { paddingBottom: 2 },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
    position: "relative",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  infoText: {
    display: "flex",
  },
};

const EditPostModal = ({
  onClose,
  openModal,
  postId,
  originalPostTextContent,
  originalPostTimeStamp,
  prevEditedPostTimestamp,
}: EditPostModalProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const existingPost = useAppSelector((state) =>
    state.posts.posts.find((post) => post.postId === postId)
  );

  useEffect(() => {
    setPostTextContent(originalPostTextContent);
  }, [originalPostTextContent]);

  const handleEdit = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/posts/updatePost",
        {
          postId: postId,
          textContent: postTextContent,
          editedTimestamp: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      open={openModal}
      scroll="paper"
      sx={styles.dialog}
      PaperProps={{ style: styles.paperProps }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography sx={styles.titleText} variant="subtitle1">
          Edit Post
        </Typography>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.editPostContainer}>
          <Box sx={styles.editPostHeader}>
            <Box sx={styles.avatarIcon}>
              <UserAvatar username={user.username} />
            </Box>
            <Box sx={styles.userInfo}>
              <Box sx={styles.infoText}>
                <Typography variant="subtitle1">{user.username}</Typography>
                <Typography variant="subtitle2">{`@${user.displayName}`}</Typography>
              </Box>
              <Typography variant="subtitle2">
                {prevEditedPostTimestamp
                  ? formatTimestamp(prevEditedPostTimestamp, true)
                  : formatTimestamp(originalPostTimeStamp)}
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
