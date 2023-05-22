import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
} from "@mui/material";

const styles = {
  avatar: { margin: "auto" },
};

export type LatestMessageDetails = {
  displayName: string;
  username: string;
  textContent: string;
  timestamp: string;
};

type MessageListItemProps = {
  latestMessageDetails: LatestMessageDetails;
};

const MessagesListItem = ({ latestMessageDetails }: MessageListItemProps) => {
  return (
    <ListItemButton>
      <Stack direction="row">
        <ListItemAvatar sx={styles.avatar}>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={`${latestMessageDetails.displayName} @${latestMessageDetails.username} - ${latestMessageDetails.timestamp}`}
          secondary={latestMessageDetails.textContent}
        />
      </Stack>
    </ListItemButton>
  );
};

export default MessagesListItem;
