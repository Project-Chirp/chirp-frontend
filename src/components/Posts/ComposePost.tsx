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
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";

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

const ComposePost = () => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useSelector((state: RootState) => state.user.value);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      await axios.post("http://localhost:3001/api/posts", {
        userId: user.userId,
        textContent,
      });
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
            placeholder="What's happening?"
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
