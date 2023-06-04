import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { appendPost } from "../../state/slices/postsSlice";

type ComposeReplyProps = {
  placeholder: string;
};

const styles = {
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
};

const ComposeReply = ({ placeholder }: ComposeReplyProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const [focusReply, setFocusReply] = useState(false);
  const user = useAppSelector((state) => state.user);
  const post = useAppSelector((state) => state.post);
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              placeholder={placeholder}
              sx={styles.textField}
              value={postTextContent}
              variant="standard"
              onFocus={() => setFocusReply(true)}
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
        <Divider />
      </Box>
    </form>
  );
};

export default ComposeReply;