import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  selectMessages,
  selectSelectedConversation,
  setMessages,
  setSelectedConversation,
} from "../../state/slices/messagesSlice";
import { ChatBioType } from "../../types/chatBio";
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
  const messages = useAppSelector(selectMessages);
  const selectedConversation = useAppSelector(selectSelectedConversation);
  const [chatBio, setChatBio] = useState<ChatBioType>({
    bio: "",
    username: "",
    userId: 0,
    displayName: "",
    followerCount: 0,
    joinedDate: "",
  });
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
        const { displayName, imageUrl, userId, username } = result.chatBio;
        const newSelectedConversation = {
          displayName,
          imageUrl,
          userId,
          username,
        };
        dispatch(setMessages(result.messages));
        dispatch(setSelectedConversation(newSelectedConversation));
        setChatBio(result.chatBio);
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
      <ChatList bioContents={chatBio} messages={messages} />
      <Divider />
      <ChatInput />
    </>
  );
};

export default ChatContainer;
