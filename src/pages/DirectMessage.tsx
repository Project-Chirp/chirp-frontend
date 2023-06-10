import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import ConversationList from "../components/Messages/ConversationList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import SearchBar from "../components/Common/SearchBar";

const styles = {
  button: {
    borderRadius: 10,
    marginTop: 1,
  },
  messagesHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 0,
  },
  conversationListContainer: {
    maxWidth: "30%",
  },
  root: {
    width: "100%",
  },
  selectMessageContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "50%",
  },
};

export type Message = {
  messageId: number;
  timestamp: string;
  textContent: string;
  sentUserId: number;
  receivedUserId: number;
};

const DirectMessage = () => {
  const { userId1, userId2 } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchDirectMessage = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/messages/${userId1}/${userId2}`
      );
      setMessages(result.data as Message[]);
    };
    fetchDirectMessage();
  }, [userId1, userId2]);

  return (
    <Stack
      direction="row"
      sx={styles.root}
      divider={<Divider orientation="vertical" />}
    >
      <Box sx={styles.conversationListContainer}>
        <Box sx={styles.messagesHeader}>
          <Typography variant="h6">Messages</Typography>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Box>
        <SearchBar placeholder="Search Messages" />
        <Divider />
        <ConversationList />
      </Box>
      <Box sx={styles.selectMessageContainer}>
        <List component="div" sx={{ width: "100%" }}>
          {messages.map((o) => (
            <ListItem component="div">
              <ListItemText
                sx={
                  o.sentUserId === user.userId
                    ? {
                        display: "flex",
                        justifyContent: "flex-end",
                      }
                    : undefined
                }
              >
                <Typography variant="body2">{o.textContent}</Typography>
                <Typography variant="caption">{o.timestamp}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
};

export default DirectMessage;
