import {
  ListItem,
  ListItemButton,
  Box,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

const styles = {
  box: { display: "flex" },
  avatar: { margin: "auto" },
  text: { fontFamily: "Inter" },
};

type MessageListItemProps = {
  displayName: string;
  username: string;
  message: string;
  timestamp: string;
};

const MessagesListItem = ({
  displayName,
  username,
  message,
  timestamp,
}: MessageListItemProps) => {
  return (
    <ListItem disablePadding component="div">
      <ListItemButton>
        <Box sx={styles.box}>
          <ListItemAvatar sx={styles.avatar}>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>{`${displayName} @${username} - ${timestamp}`}</Typography>
            }
            secondary={<Typography>{message}</Typography>}
            sx={styles.text}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default MessagesListItem;
