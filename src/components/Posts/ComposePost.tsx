import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";

type ComposePostProps = {
  placeholder: string;
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
  postButton: {
    "&.Mui-disabled": {
      backgroundColor: "primary.light",
      color: "white",
    },
    borderRadius: 5,
    height: 35,
    weight: 35,
  },
};

const ComposePost = ({ placeholder }: ComposePostProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
              <IconButton size="small" color="primary">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
              <IconButton size="small" color="primary">
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
      <Divider light />
    </form>
  );
};

export default ComposePost;
