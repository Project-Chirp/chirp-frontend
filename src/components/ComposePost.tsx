import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

const ComposePost = () => {
  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <AccountCircle fontSize="large" sx={{ paddingRight: 1 }} />
      <Box>
        <TextField
          id="standard-multiline-static"
          hiddenLabel
          multiline
          variant="standard"
          placeholder="What's happening?"
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
          <Button variant="contained" size="small">
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComposePost;
