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
  messageTimestamp: string;
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
          primary={`${latestMessageDetails.displayName} @${latestMessageDetails.username} - ${latestMessageDetails.messageTimestamp}`}
          secondary={latestMessageDetails.textContent}
        />
      </Stack>
    </ListItemButton>
  );
};

export default MessagesListItem;
