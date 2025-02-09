import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ConversationList from "../components/Messages/ConversationList";
import NewMessageModal from "../components/Messages/NewMessageModal/NewMessageModal";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setConversations } from "../state/slices/messagesSlice";
import { selectCurrentUserId } from "../state/slices/userSlice";
import useAxios from "../utilities/useAxios";

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

  const userId = useAppSelector(selectCurrentUserId);
  const conversations = useAppSelector((state) => state.messages.conversations);

  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { userId },
        },
        "messages",
      );
      dispatch(setConversations(result));
    };
    fetchMessages();
  }, [dispatch, userId, sendRequest]);

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
      <NewMessageModal
        activeConversations={conversations.map((o) => ({
          displayName: o.displayName,
          imageUrl: o.imageUrl,
          userId: o.userId,
          username: o.username,
        }))}
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </>
  );
};

export default Messages;
