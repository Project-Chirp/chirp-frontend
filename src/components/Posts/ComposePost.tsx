import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";
import UserAvatar from "../Common/UserAvatar";

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
  const { sendRequest } = useAxios();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const newPost = await sendRequest(
        {
          method: "POST",
          data: { textContent, userId: user.userId },
        },
        "posts",
      );
      setPostTextContent("");
      dispatch(
        appendPost({
          ...newPost,
          username: user.username,
          displayName: user.displayName,
        }),
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
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ComposePost;
