import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Chatbox = () => {
  return (
    <Box>
      {/* Header section */}
      <Box sx={{ display: "flex" }}>
        <IconButton>
          <AccountCircle sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography sx={{ margin: "auto" }}>UserName</Typography>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Box>

      <Divider></Divider>
      {/* Chat Body */}

      <Box sx={{ height: 1 }}>
        <div dir="rtl">
          <Typography
            sx={{
              backgroundColor: "#22AA6F",
              fontFamily: "Inter",
              color: "white",
              borderRadius: "16px",
              padding: "10px",
              width: "fit-content",
              right: "200",
            }}
          >
            Hey
          </Typography>
        </div>
        <Typography
          sx={{ fontFamily: "Inter", textAlign: "end", fontSize: "small" }}
        >
          10.00am
        </Typography>

        <Typography
          sx={{
            backgroundColor: "#F0F0F0",
            fontFamily: "Inter",
            borderRadius: "16px",
            padding: "10px",
            width: "fit-content",
          }}
        >
          Hey
        </Typography>
        <Typography sx={{ fontFamily: "Inter", fontSize: "small" }}>
          12.00am
        </Typography>
      </Box>

      {/* Messaging text field */}
      <Box>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <AddPhotoAlternateOutlinedIcon />
                </IconButton>

                <IconButton>
                  <GifBoxOutlinedIcon />
                </IconButton>

                <IconButton>
                  <EmojiEmotionsOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),

            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SendOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          multiline
          hiddenLabel
          placeholder="Start a new message"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
            "& .MuiInputLabel-outlined": {
              paddingLeft: "20px",
            },
          }}
        ></TextField>
      </Box>
    </Box>
  );
};

export default Chatbox;
