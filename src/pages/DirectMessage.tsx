import { Box, Divider, Stack } from "@mui/material";
import ChatContainer from "../components/Messages/ChatContainer";
import ConversationList from "../components/Messages/ConversationList";
import NavBar from "../components/NavBar/NavBar";

const styles = {
  chatContanier: {
    display: "flex",
    flex: "0 0 600px",
    flexDirection: "column",
    height: "100vh",
  },
  container: { height: "auto", justifyContent: "center" },
  conversationContainer: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
  divider: { height: "auto" },
};

const DirectMessage = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" sx={styles.divider} />}
      sx={styles.container}
    >
      <NavBar />
      <Box sx={styles.conversationContainer}>
        <ConversationList />
      </Box>
      <Box sx={styles.chatContanier}>
        <ChatContainer />
      </Box>
    </Stack>
  );
};

export default DirectMessage;
