import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Conversation } from "../../types/messages";
import formatTimestamp from "../../utilities/formatTimestamp";
import UserAvatar from "../Common/UserAvatar";

const styles = {
  avatar: { margin: "auto" },
  displayName: {
    flex: "1, 1, auto",
    minWidth: 0,
  },
  primaryTextContainer: {
    display: "flex",
    gap: 0.5,
  },
  stack: {
    width: "100%",
  },
  timestamp: {
    flex: "1, 0, auto",
    fontSize: 15,
    minWidth: "fit-content",
  },
  username: { flex: "1, 1, auto", fontSize: 15, minWidth: 0 },
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
  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <Stack direction="row" sx={styles.stack}>
        <ListItemAvatar
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          sx={styles.avatar}
        >
          <UserAvatar username={conversation.username} />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box sx={styles.primaryTextContainer}>
              <Typography noWrap sx={styles.displayName} variant="subtitle1">
                {conversation.displayName}
              </Typography>
              <Typography noWrap sx={styles.username} variant="subtitle2">
                {`@${conversation.username}`}
              </Typography>
              {conversation.timestamp && (
                <Typography noWrap sx={styles.timestamp} variant="subtitle2">
                  {`- ${formatTimestamp(conversation.timestamp)}`}
                </Typography>
              )}
            </Box>
          }
          secondary={
            <Typography noWrap variant="body1">
              {conversation.textContent}
            </Typography>
          }
        />
      </Stack>
    </ListItemButton>
  );
};

export default ConversationListItem;
