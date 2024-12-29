import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../pages/PageLoader";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  setMessages,
  setSelectedConversation,
} from "../../state/slices/messagesSlice";
import useAxios from "../../utilities/useAxios";
import TooltipTimestamp from "../Common/TooltipTimestamp";
import ChatBio from "./ChatBio";

const styles = {
  bioContainer: {
    width: "100%",
    height: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "gray.light",
      cursor: "pointer",
    },
  },
  chatList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflowY: "hidden",
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  messageList: { flex: 1, overflowY: "scroll", paddingTop: 0 },
  messageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "primary.light",
  },
  sentMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  sentMessageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "primary.main",
  },
  timestamp: { marginTop: 0.5 },
};

const ChatList = () => {
  const [loading, setLoading] = useState(true);

  const currentUserId = useAppSelector((state) => state.user.userId);
  const { messages, selectedConversation } = useAppSelector(
    (state) => state.messages,
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { userId1, userId2 } = useParams();
  const { sendRequest } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      const fetchDirectMessage = async () => {
        const result = await sendRequest(
          {
            method: "GET",
          },
          `messages/${userId1}/${userId2}`,
        );
        dispatch(setMessages(result.messages));
        dispatch(
          setSelectedConversation({
            ...result.otherUser,
            userId: Number(userId2),
          }),
        );
      };
      fetchDirectMessage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, userId1, userId2, sendRequest]);

  useEffect(() => {
    messageRef.current?.scrollTo(0, messageRef.current.scrollHeight);
  }, [messages]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box sx={styles.chatList}>
      <List component="div" ref={messageRef} sx={styles.messageList}>
        <Box
          onClick={() => navigate(`/${selectedConversation.username}`)}
          sx={styles.bioContainer}
        >
          <ChatBio
            bio={selectedConversation.bio}
            displayName={selectedConversation.displayName}
            followerCount={selectedConversation.followerCount}
            joinedDate={selectedConversation.joinedDate}
            username={selectedConversation.username}
          />
        </Box>
        <Divider />
        {messages.map((o) => (
          <ListItem component="div" key={o.messageId}>
            <ListItemText
              disableTypography
              primary={
                <Box
                  sx={
                    o.sentUserId === currentUserId
                      ? styles.sentMessageText
                      : styles.messageText
                  }
                >
                  <Typography>{o.textContent}</Typography>
                </Box>
              }
              secondary={
                <Box sx={styles.timestamp}>
                  <TooltipTimestamp timestamp={o.timestamp} variant="body2" />
                </Box>
              }
              sx={
                o.sentUserId === currentUserId
                  ? styles.sentMessage
                  : styles.message
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
