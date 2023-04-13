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

export type LatestMessageDetails = {
  displayName: string;
  username: string;
  message: string;
  timestamp: string;
};

type MessageListItemProps = {
  latestMessageDetails: LatestMessageDetails;
};

const MessagesListItem = ({ latestMessageDetails }: MessageListItemProps) => {
  return (
    <ListItem disablePadding component="div">
      <ListItemButton>
        <Box sx={styles.box}>
          <ListItemAvatar sx={styles.avatar}>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>{`${latestMessageDetails.displayName} @${latestMessageDetails.username} - ${latestMessageDetails.timestamp}`}</Typography>
            }
            secondary={<Typography>{latestMessageDetails.message}</Typography>}
            sx={styles.text}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default MessagesListItem;
