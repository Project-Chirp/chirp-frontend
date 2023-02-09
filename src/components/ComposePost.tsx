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
      <Box sx={{ display: "flex", padding: 3 }}>
        <Box sx={{ paddingRight: 1.5 }}>
          <Avatar />
        </Box>
        <Box sx={{ minWidth: 250 }}>
          <TextField
            fullWidth
            id="standard-multiline-static"
            hiddenLabel
            multiline
            variant="standard"
            value={postTextContent}
            placeholder="What's happening?"
            sx={{ paddingBottom: 1 }}
            onChange={(e) => setPostTextContent(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Stack direction="row">
              <IconButton size="small">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: 10 }}
              type="submit"
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
