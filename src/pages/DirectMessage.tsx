import { Box, Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { io } from "socket.io-client";
import ChatContainer from "../components/Messages/ChatContainer";
import ConversationList from "../components/Messages/ConversationList";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch } from "../state/hooks";
import { addMessage, Message } from "../state/slices/messagesSlice";

const styles = {
  chatContainer: {
    display: "flex",
    flex: "0 0 600px",
    flexDirection: "column",
    height: "100vh",
  },
  container: { height: "auto", justifyContent: "center" },
  conversationList: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
  divider: { height: "auto" },
};

const socket = io("http://localhost:3001/");

const DirectMessage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (newMessage: Message) => {
      console.log(newMessage);
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" sx={styles.divider} />}
      sx={styles.container}
    >
      <NavBar />
      <Box sx={styles.conversationList}>
        <ConversationList />
      </Box>
      <Box sx={styles.chatContainer}>
        <ChatContainer />
      </Box>
    </Stack>
  );
};

export default DirectMessage;
