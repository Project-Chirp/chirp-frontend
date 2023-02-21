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

const styles = {
  avatarIcon: { paddingRight: 1.5 },
  compostPostContainer: { display: "flex", padding: 3 },
  textFieldContainer: { minWidth: 250 },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
  },
};

const ComposePost = () => {
  const [postTextContent, setPostTextContent] = useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const text_content = postTextContent;
      const response = await axios.post("http://localhost:3001/api/posts", {
        text_content,
      });
      console.log(response);
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
            sx={{ paddingBottom: 1 }}
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
              sx={{ borderRadius: 10 }}
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
