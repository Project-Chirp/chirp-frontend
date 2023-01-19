import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

type ConversationProps = {
  displayName: string;
  message: string;
  messageTimestamp: string;
  userName: string;
};

const Conversation = ({
  displayName,
  message,
  messageTimestamp,
  userName,
}: ConversationProps) => {
  return (
    <ListItem disablePadding component="div">
      <ListItemButton>
        <Box sx={{ display: "flex" }}>
          <ListItemAvatar sx={{ margin: "auto" }}>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>{`${displayName} @${displayName} - ${messageTimestamp}`}</Typography>
            }
            secondary={<Typography>{message}</Typography>}
            sx={{ fontFamily: "Inter" }}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default Conversation;
