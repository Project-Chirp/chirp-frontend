import { Box, Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import ChatContainer from "../components/Messages/ChatContainer";
import ConversationList from "../components/Messages/ConversationList";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setConversations } from "../state/slices/messagesSlice";
import { selectCurrentUserId } from "../state/slices/userSlice";
import useAxios from "../utilities/useAxios";

const styles = {
  chatContainer: {
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
  const userId = useAppSelector(selectCurrentUserId);

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
        <ChatContainer />
      </Box>
    </Stack>
  );
};

export default DirectMessage;
