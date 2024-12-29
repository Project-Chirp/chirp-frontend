import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../state/hooks";
import UserAvatar from "../Common/UserAvatar";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

const styles = {
  headerContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
  },
  headerContent: { alignItems: "center", display: "flex", gap: 2, padding: 1 },
};

const ChatContainer = () => {
  const { selectedConversation } = useAppSelector((state) => state.messages);

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.headerContent}>
          <UserAvatar username={selectedConversation.username} />
          <Box>
            <Typography variant="subtitle1">
              {selectedConversation.displayName}
            </Typography>
            <Typography variant="subtitle2">{`@${selectedConversation.username}`}</Typography>
          </Box>
        </Box>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      <ChatList />
      <Divider />
      <ChatInput />
    </>
  );
};

export default ChatContainer;
