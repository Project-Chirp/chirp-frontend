import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const Conversation = () => {
  return (
    <ListItem disablePadding component="div">
      <ListItemButton>
        <Box sx={{ display: "flex" }}>
          <ListItemAvatar sx={{ margin: "auto" }}>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography>Buzzkill @itsthebuzzkill - 3h</Typography>}
            secondary={<Typography>Hey what's up</Typography>}
            sx={{ fontFamily: "Inter" }}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default Conversation;
