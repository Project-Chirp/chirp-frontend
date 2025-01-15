import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  setMessages,
  setSelectedConversation,
} from "../../state/slices/messagesSlice";
import useAxios from "../../utilities/useAxios";
import UserAvatar from "../Common/UserAvatar";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

const styles = {
  headerContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingX: 2,
  },
  headerContent: { alignItems: "center", display: "flex", gap: 2, padding: 1 },
};

const ChatContainer = () => {
  const { messages, selectedConversation } = useAppSelector(
    (state) => state.messages,
  );
  const dispatch = useAppDispatch();

  const { userId1: currentUserId, userId2: otherUserId } = useParams();
  const { sendRequest } = useAxios();

  useEffect(() => {
    try {
      const fetchDirectMessage = async () => {
        const result = await sendRequest(
          {
            method: "GET",
          },
          `messages/${currentUserId}/${otherUserId}`,
        );
        dispatch(setMessages(result.messages));
        dispatch(setSelectedConversation(result.otherUserDetail));
      };
      fetchDirectMessage();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentUserId, otherUserId, sendRequest]);

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.headerContent}>
          <UserAvatar username={selectedConversation.username} />
          <Box>
            <Typography variant="subtitle1">
              {selectedConversation.displayName}
            </Typography>
            <Typography variant="subtitle2">{`@${selectedConversation.username}`}</Typography>
          </Box>
        </Box>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      <ChatList messages={messages} userDetail={selectedConversation} />
      <Divider />
      <ChatInput />
    </>
  );
};

export default ChatContainer;
