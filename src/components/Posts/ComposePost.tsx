import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

type ComposePostProps = {
  placeholder: string;
  minRows?: number;
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
  },
  emojiContainer: { position: "absolute", zIndex: 1 },
  emojiPicker: {
    height: 300,
    width: 250,
    "--epr-emoji-size": "25px",
  },
};

const ComposePost = ({ placeholder, minRows }: ComposePostProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const twitterEmojiStyle = EmojiStyle.TWITTER;

  const clickOffEmojiPicker = (event: React.FocusEvent) => {
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

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const newPost = await axios.post("http://localhost:3001/api/posts", {
        userId: user.userId,
        textContent,
      });
      setPostTextContent("");
      dispatch(
        appendPost({
          ...newPost.data,
          username: user.username,
          displayName: user.displayName,
        })
      );
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
            minRows={minRows}
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
              <Stack direction="column">
                <IconButton
                  id="emoji-button"
                  size="small"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <EmojiEmotionsOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
            <Button
              disabled={!postTextContent.trim()}
              size="small"
              type="submit"
              variant="contained"
              onBlur={(event) => clickOffEmojiPicker(event)}
            >
              Post
            </Button>
          </Box>
          {showEmojiPicker && (
            <Box
              sx={styles.emojiContainer}
              ref={emojiContainerRef}
              tabIndex={0}
              onBlur={clickOffEmojiPicker}
            >
              <EmojiPicker
                style={styles.emojiPicker}
                emojiStyle={twitterEmojiStyle}
                onEmojiClick={(emoji) => {
                  setPostTextContent(
                    (prevContent) => prevContent + emoji.emoji
                  );
                }}
                previewConfig={{ showPreview: false }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default ComposePost;
