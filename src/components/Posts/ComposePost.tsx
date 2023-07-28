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
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";

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
};

const ComposePost = ({ placeholder, minRows }: ComposePostProps) => {
  const [postTextContent, setPostTextContent] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const textContent = postTextContent;
      const newPost = await sendRequest({
        url: "/posts",
        method: "post",
        data: { userId: user.userId, textContent },
      });
      setPostTextContent("");
      dispatch(
        appendPost({
          ...newPost,
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
              <IconButton size="small">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Stack>
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

export default ComposePost;
