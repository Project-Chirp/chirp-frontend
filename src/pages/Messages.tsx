import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ConversationList from "../components/Messages/ConversationList";
import CreateMessageModal from "../components/Messages/CreateMessageModal/CreateMessageModal";
import NavBar from "../components/NavBar/NavBar";

const styles = {
  button: {
    marginTop: 1,
  },
  container: { height: "auto", justifyContent: "center" },
  divider: { height: "auto" },
  middleContent: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
  nav: { flex: "0 0 275px", height: "100vh", position: "sticky", top: 0 },
  rightContent: {
    height: "100vh",
    flex: "0 0 600px",
  },
  selectMessageContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Messages = () => {
  const [messageModal, showMessageModal] = useState(false);

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" sx={styles.divider} />}
      sx={styles.container}
    >
      <Box component="header" sx={styles.nav}>
        <NavBar />
      </Box>
      <Box sx={styles.middleContent}>
        <ConversationList />
      </Box>
      <Box sx={styles.rightContent}>
        <Box sx={styles.selectMessageContainer}>
          <Box>
            <Typography variant="h6">Select a Message</Typography>
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
      </Box>
      <CreateMessageModal
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </Stack>
  );
};

export default Messages;
