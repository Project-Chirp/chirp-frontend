import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { Message } from "../../state/slices/messagesSlice";
import { ChatBioType } from "../../types/chatBio";
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

type ChatListProps = {
  messages: Message[];
  bioContents: ChatBioType;
};

const ChatList = ({ messages, bioContents }: ChatListProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentUserId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    messageRef.current?.scrollTo(0, messageRef.current.scrollHeight);
  }, [messages]);

  return (
    <Box sx={styles.chatList}>
      <List component="div" ref={messageRef} sx={styles.messageList}>
        <Box
          onClick={() => navigate(`/${bioContents.username}`)}
          sx={styles.bioContainer}
        >
          <ChatBio bioContents={bioContents} />
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
