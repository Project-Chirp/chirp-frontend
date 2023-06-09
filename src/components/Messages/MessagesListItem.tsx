import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
  Box,
} from "@mui/material";

const styles = {
  avatar: { margin: "auto" },
  displayName: {
    flex: 1,
    minWidth: 0,
    fontWeight: "bold",
  },
  primaryTextContainer: {
    display: "flex",
    gap: 0.5,
  },
  stack: {
    width: "100%",
  },
  username: { flex: 1, minWidth: 0 },
};

export type LatestMessageDetails = {
  displayName: string;
  otherUserId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

type MessageListItemProps = {
  latestMessageDetails: LatestMessageDetails;
  onClick: () => void;
  selected: boolean;
};

const MessagesListItem = ({
  latestMessageDetails,
  onClick,
  selected,
}: MessageListItemProps) => {
  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <Stack direction="row" sx={styles.stack}>
        <ListItemAvatar sx={styles.avatar}>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box sx={styles.primaryTextContainer}>
              <Typography noWrap sx={styles.displayName} variant="body2">
                {latestMessageDetails.displayName}
              </Typography>
              <Typography noWrap sx={styles.username} variant="body2">
                {`@${latestMessageDetails.username}`}
              </Typography>
              <Typography noWrap variant="body2">
                {`- ${latestMessageDetails.timestamp}`}
              </Typography>
            </Box>
          }
          secondary={
            <Typography noWrap variant="body2">
              {latestMessageDetails.textContent}
            </Typography>
          }
        />
      </Stack>
    </ListItemButton>
  );
};

export default MessagesListItem;
