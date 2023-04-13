import { Box, Divider, List, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Messages/SearchBar";

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
        {/* {testData.map((o) => (
          <Conversation
            displayName={o.displayName}
            message={o.message}
            messageTimestamp={o.messageTimestamp}
            userName={o.userName}
          />
        ))} */}
      </List>
    </Box>
  );
};

export default Messages;
