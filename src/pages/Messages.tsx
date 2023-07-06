import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Common/SearchBar";
import { useState } from "react";
import CreateMessageModal from "../components/Messages/CreateMessageModal/CreateMessageModal";
import ConversationList from "../components/Messages/ConversationList";

const styles = {
  button: {
    marginTop: 1,
  },
  root: {
    width: "100%",
  },
  selectMessageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
};

const Messages = () => {
  const [messageModal, setMessageModal] = useState(false);

  return (
    <Stack direction="row" sx={styles.root}>
      <ConversationList />
      <Divider flexItem orientation="vertical" />
      <Box sx={styles.selectMessageContainer}>
        <Box>
          <Typography variant="h6">Select a Message</Typography>
          <Typography>
            Choose one of your existing conversations or start a new one!
          </Typography>
          <Button variant="contained" sx={styles.button}>
            New Message
          </Button>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Stack>
  );
};

export default Messages;
