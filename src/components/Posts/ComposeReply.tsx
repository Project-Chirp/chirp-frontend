import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { addReply } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";

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

  return (
    <form onSubmit={onSubmit}>
      <Box sx={styles.compostPostContainer}>
        <Box sx={styles.topContainer}>
          <Box sx={styles.avatarIcon}>
            <UserAvatar userId={user.userId} />
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
              <IconButton size="small">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Stack>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default ComposeReply;
