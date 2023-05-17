import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../state/hooks";

type ComposePostProps = {
  placeholder: string;
  isReply: boolean;
};

const styles = {
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: { display: "flex", padding: 3 },
  textFieldContainer: { width: "100%" },
  textField: { paddingBottom: 2 },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
  },
  postButton: { borderRadius: 5 },
};

const ComposePost = ({ placeholder, isReply }: ComposePostProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const post = useAppSelector((state) => state.post);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      switch (isReply) {
        case true:
          await axios.post("http://localhost:3001/api/posts/postReply", {
            userId: user.userId,
            parentPostId: post.postId,
            textContent,
          });
          break;
        case false:
          await axios.post("http://localhost:3001/api/posts", {
            userId: user.userId,
            textContent,
          });
          break;
        default:
          break;
      }

      setPostTextContent("");
      // TODO: Update posts in postContext so that the page rerenders rather than refreshing
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={styles.compostPostContainer}>
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
          />
          <Box sx={styles.postActions}>
            <Stack direction="row">
              <IconButton size="small">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Stack>
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
      </Box>
    </form>
  );
};

export default ComposePost;
