import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { addReply } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";

type ComposeReplyProps = {
  placeholder: string;
  parentPostId: number;
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

const ComposeReply = ({
  placeholder,
  parentPostId,
  onClose,
}: ComposeReplyProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const [focusReply, setFocusReply] = useState(true);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const reply = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/postReply`,
        {
          userId: user.userId,
          parentPostId,
          textContent,
        }
      );
      setPostTextContent("");
      dispatch(
        addReply({
          ...reply.data,
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
            onFocus={() => setFocusReply(true)}
            placeholder={placeholder}
            sx={styles.textField}
            value={postTextContent}
            variant="standard"
          />
          <Box sx={styles.postActions}>
            {focusReply && (
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
            )}
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

export default ComposeReply;
