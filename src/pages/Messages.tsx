import { Box, Button, Divider, List, Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Messages/SearchBar";
import MessagesList from "../components/Messages/MessagesList";

const styles = {
  button: {
    borderRadius: 10,
    marginTop: 1,
  },
  messagesContainer: {
    borderColor: "#808080",
    width: "30%",
  },
  selectMessageContainer: { width: "50%", margin: "auto", gap: 1 },
  messagesHeader: {
    display: "flex",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  root: {
    width: "100%",
  },
};

const Messages = () => {
  return (
    <Stack
      direction="row"
      sx={styles.root}
      divider={<Divider orientation="vertical" />}
    >
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
      <Stack
        sx={styles.selectMessageContainer}
        direction="column"
        alignItems="start"
      >
        <Typography variant="h6">Select a Message</Typography>
        <Typography>
          Choose one of your existing conversations or start a new one!
        </Typography>
        <Button variant="contained" sx={styles.button}>
          New Message
        </Button>
      </Stack>
    </Stack>
  );
};

export default Messages;
