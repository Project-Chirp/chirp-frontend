import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Conversation } from "../../state/slices/messagesSlice";
import formatTimestamp from "../../utilities/formatTimestamp";
import UserAvatar from "../Common/UserAvatar";

const styles = {
  avatar: { margin: "auto" },
  displayName: {
    flex: "1, 1, auto",
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
  timestamp: { flex: "1, 0, auto", minWidth: "fit-content" },
  username: { flex: "1, 1, auto", minWidth: 0 },
};

type ConversationListItemProps = {
  conversation: Conversation;
  onClick: () => void;
  selected: boolean;
};

const ConversationListItem = ({
  conversation,
  onClick,
  selected,
}: ConversationListItemProps) => {
  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <Stack direction="row" sx={styles.stack}>
        <ListItemAvatar onClick={handleAvatarClick} sx={styles.avatar}>
          <UserAvatar username={conversation.username} />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box sx={styles.primaryTextContainer}>
              <Typography noWrap sx={styles.displayName} variant="body2">
                {conversation.displayName}
              </Typography>
              <Typography noWrap sx={styles.username} variant="body2">
                {`@${conversation.username}`}
              </Typography>
              <Typography noWrap sx={styles.timestamp} variant="body2">
                {`- ${formatTimestamp(conversation.timestamp)}`}
              </Typography>
            </Box>
          }
          secondary={
            <Typography noWrap variant="body2">
              {conversation.textContent}
            </Typography>
          }
        />
      </Stack>
    </ListItemButton>
  );
};

export default ConversationListItem;
