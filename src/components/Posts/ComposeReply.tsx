import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { addReply } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import EmojiPicker from "emoji-picker-react";

type ComposeReplyProps = {
  placeholder: string;
  parentPostId: number;
  onClose?: () => void;
};

const styles = {
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: {
    justifyContent: "space-between",
  },
  textFieldContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  textField: { paddingBottom: 2, paddingRight: 1 },
  postActions: {
    paddingLeft: 7.5,
    paddingBottom: 2,
  },
  postButton: {
    minHeight: "34px",
  },
  topContainer: {
    display: "flex",
    paddingX: 2,
    padddingY: 0,
    justifyContent: "space-between",
  },
  emojiContainer: { position: "absolute", zIndex: 1, marginTop: 5 },
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
        "http://localhost:3001/api/posts/postReply",
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const clickOffEmojiPicker = (event: React.FocusEvent<HTMLDivElement>) => {
    const emojiButton = event.relatedTarget as HTMLElement;
    const isEmojiButton = emojiButton && emojiButton.id === "emoji-button";

    if (
      emojiContainerRef.current &&
      !emojiContainerRef.current.contains(emojiButton) &&
      !isEmojiButton
    ) {
      setShowEmojiPicker(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={styles.compostPostContainer}>
        <Box sx={styles.topContainer}>
          <Box sx={styles.avatarIcon}>
            <UserAvatar username={user.username} />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              hiddenLabel
              id="standard-multiline-static"
              multiline
              onChange={(e) => setPostTextContent(e.target.value)}
              onFocus={() => setFocusReply(true)}
              placeholder={placeholder}
              sx={styles.textField}
              value={postTextContent}
              variant="standard"
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
        {focusReply && (
          <Box sx={styles.postActions}>
            <Stack direction="row">
              <IconButton size="small">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={toggleEmojiPicker}
                id="emoji-button"
              >
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              {showEmojiPicker && (
                <Box
                  sx={styles.emojiContainer}
                  ref={emojiContainerRef}
                  tabIndex={0}
                  onBlur={clickOffEmojiPicker}
                >
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      setPostTextContent(
                        (prevContent) => prevContent + emoji.emoji
                      );
                    }}
                    previewConfig={{ showPreview: false }}
                  />
                </Box>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default ComposeReply;
