import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ConversationList from "../components/Messages/ConversationList";
import CreateMessageModal from "../components/Messages/CreateMessageModal/CreateMessageModal";
import NavBar from "../components/NavBar/NavBar";

const styles = {
  button: {
    marginTop: 1,
  },
  chatContainer: {
    alignItems: "center",
    display: "flex",
    flex: "0 0 600px",
    height: "100vh",
    justifyContent: "center",
  },
  container: { height: "auto", justifyContent: "center" },
  conversationContainer: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
  divider: { height: "auto" },
};

const Messages = () => {
  const [messageModal, showMessageModal] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" sx={styles.divider} />}
        sx={styles.container}
      >
        <NavBar />
        <Box sx={styles.conversationContainer}>
          <ConversationList />
        </Box>
        <Box sx={styles.chatContainer}>
          <Box>
            <Typography variant="h1">Select a Message</Typography>
            <Typography>
              Choose one of your existing conversations or start a new one!
            </Typography>
            <Button
              onClick={() => showMessageModal(true)}
              sx={styles.button}
              variant="contained"
            >
              New Message
            </Button>
          </Box>
        </Box>
      </Stack>
      <CreateMessageModal
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </>
  );
};

export default Messages;
