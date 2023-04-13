import { Box, Divider, List, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Messages/SearchBar";
import MessagesList from "../components/Messages/MessagesList";

const styles = {
  messagesBox: { paddingRight: 2, paddingLeft: 2 },
  messagesHeaderBox: {
    padding: 1,
    display: "flex",
    justifyContent: "space-between",
  },
};

const Messages = () => {
  return (
    <Box sx={styles.messagesBox}>
      <Box sx={styles.messagesHeaderBox}>
        <Typography variant="h6">Messages</Typography>
        <IconButton>
          <ChatIcon className="ChatIcon" />
        </IconButton>
      </Box>
      <SearchBar />
      <List component="div">
        <Divider />
        <MessagesList />
      </List>
    </Box>
  );
};

export default Messages;
