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
        <Box sx={{ padding: "10px", display: "flex" }}>
          <ListItemAvatar sx={{ margin: "auto" }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography>Buzzkill @itsthebuzzkill - 3h</Typography>}
            secondary={<Typography>Hey what's up</Typography>}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default Conversation;
