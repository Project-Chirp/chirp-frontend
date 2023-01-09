import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  ListItemText,
  List,
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
      <Box sx={{ display: "flex", alignContent: "flex-start" }}>
      <IconButton>
        <AccountCircle sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography sx={{ margin: "auto" }}>UserName</Typography>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Box>

      {/* Chat Body */}
      <Box sx={{height: 1}}>
       <List> 

        <Box sx={{justifyContent:'end'}}>
        <ListItemText  
        primary="Hey" 
        secondary="10.00am">
        </ListItemText>
       </Box>


        <Box sx={{justifyContent:"start"}}>
        <ListItemText primary="Hey" secondary="12.00am">
        </ListItemText>
        </Box>
 
 
       </List>
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
        ></TextField>
      </Box>
    </Box>
  );
};

export default Chatbox;
