import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";

type ComposePostProps = {
  placeholder: string;
  onClose?: () => void;
};

const styles = {
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: {
    display: "flex",
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
  },
  textFieldContainer: { width: "100%" },
  textField: { paddingBottom: 2 },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
    position: "relative",
  },
};

const ComposePost = ({ placeholder, onClose }: ComposePostProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const newPost = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        {
          userId: user.userId,
          textContent,
        }
      );
      setPostTextContent("");
      dispatch(
        appendPost({
          ...newPost.data,
          username: user.username,
          displayName: user.displayName,
        })
      );
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={styles.compostPostContainer}>
        <Box sx={styles.avatarIcon}>
          <UserAvatar username={user.username} />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextField
            fullWidth
            hiddenLabel
            multiline
            onChange={(e) => setPostTextContent(e.target.value)}
            placeholder={placeholder}
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
              disabled={!postTextContent.trim()}
              size="small"
              type="submit"
              variant="contained"
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ComposePost;
