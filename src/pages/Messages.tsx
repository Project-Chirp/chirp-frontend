import { Box, Divider, List, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Messages/SearchBar";
import MessagesList from "../components/Messages/MessagesList";

const styles = {
  messagesContainer: { paddingLeft: 2, paddingRight: 2 },
  messagesHeader: {
    display: "flex",
    padding: 1,
    justifyContent: "space-between",
  },
};

const Messages = () => {
  return (
    <Box sx={styles.messagesContainer}>
      <Box sx={styles.messagesHeader}>
        <Typography variant="h6">Messages</Typography>
        <IconButton>
          <ChatIcon />
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
