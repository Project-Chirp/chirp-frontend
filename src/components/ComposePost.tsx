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

const ComposePost = () => {
  return (
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
          placeholder="What's happening?"
          sx={{ paddingBottom: 1 }}
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
          <Button variant="contained" size="small" sx={{ borderRadius: 10 }}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComposePost;
