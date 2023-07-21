import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ConversationList from "../components/Messages/ConversationList";
import CreateMessageModal from "../components/Messages/CreateMessageModal/CreateMessageModal";

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
    alignItems: "flex-start",
    margin: "auto",
    width: "50%",
  },
  messageListContainer: {
    maxWidth: "30%",
  },
};

const Messages = () => {
  const [messageModal, showMessageModal] = useState(false);

  return (
    <Stack direction="row" sx={styles.root}>
      <ConversationList />
      <Divider flexItem orientation="vertical" />

      <Box sx={styles.selectMessageContainer}>
        <Typography variant="h6">Select a Message</Typography>
        <Typography>
          Choose one of your existing conversations or start a new one!
        </Typography>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => showMessageModal(true)}
        >
          New Message
        </Button>
      </Box>
      <CreateMessageModal
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </Stack>
  );
};

export default Messages;
