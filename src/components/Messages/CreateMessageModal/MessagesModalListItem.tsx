import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { DMList } from "./MessagesModalList";

const styles = {
  avatar: { margin: "auto" },
  displayName: {
    fontWeight: "bold",
  },
  primaryTextContainer: {
    gap: 0.5,
    width: "30%",
    height: "100%",
  },
  stack: {
    width: "100%",
  },
};

type MessageModalListItemProps = {
  dmList: DMList;
};

const MessageModalListItem = ({ dmList }: MessageModalListItemProps) => {
  return (
    <ListItemButton>
      <Stack direction="row" sx={styles.stack}>
        <ListItemAvatar sx={styles.avatar}>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box sx={styles.primaryTextContainer}>
              <Typography sx={styles.displayName} variant="body2">
                {dmList.displayName}
              </Typography>
              <Typography variant="body2">{`@${dmList.username}`}</Typography>
            </Box>
          }
        />
      </Stack>
    </ListItemButton>
  );
};

export default MessageModalListItem;
