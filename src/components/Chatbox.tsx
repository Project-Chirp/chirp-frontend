import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  ListItemText,
  List,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { maxHeight } from "@mui/system";

const Chatbox = () => {
  return (
    <Box>
      {/* Header section */}
      <Box sx={{ display: "flex" }}>
      <IconButton>
        <AccountCircle sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography sx={{ margin:"auto" }}>UserName</Typography>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Box>

    <Divider></Divider>
      {/* Chat Body */}

      <Box sx={{height:1}}>
        
        <ListItemText>
          <Typography sx={{textAlign: "end"}}>Hey</Typography>
          <Typography sx={{textAlign: "end", fontSize:"small"}}>10.00am</Typography>
        </ListItemText>

        <ListItemText>
          <Typography sx={{textAlign: "start"}}>Hey</Typography>
          <Typography sx={{textAlign: "start", fontSize:"small"}}>12.00am</Typography>
        </ListItemText>
        
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
              paddingLeft: "20px"
            },
          }}
        ></TextField>
      </Box>
    </Box>
  );
};

export default Chatbox;
