import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const Conversation = () => {
  return (
    <ListItem>
      <ListItemButton>
        <Box sx={{ padding: "5px", display: "flex" }}>
          <ListItemAvatar sx={{ margin: "auto" }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography>Buzzkill @itsthebuzzkill - 3h</Typography>}
            secondary={<Typography>Hey what's up</Typography>}
            sx={{fontFamily:'Inter'}}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default Conversation;
