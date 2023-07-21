import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import ConversationList from "../components/Messages/ConversationList";
import {
  appendConversation,
  setSelectedConversation,
  updateConversation,
} from "../state/slices/messagesSlice";
import theme from "../styles/Theme";

const styles = {
  chatContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflowY: "hidden",
  },
  chatInputContainer: {
    boxSizing: "border-box",
    padding: 1,
    width: "100%",
  },
  directMessageContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
  },
  headerContent: { alignItems: "center", display: "flex", gap: 2, padding: 1 },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  messageList: { flex: 1, overflowY: "scroll" },
  messageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#cce3d9",
  },
  root: {
    width: "100%",
  },
  sentMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  sentMessageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
  },
  timestamp: { marginTop: 0.5 },
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
  const [textContent, setTextContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useAppSelector((state) => state.user);
  const { selectedConversation, conversations } = useAppSelector(
    (state) => state.messages
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const userExists = conversations.find(
    (o) => o.otherUserId === Number(userId2)
  );

  useEffect(() => {
    const fetchDirectMessage = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/messages/${userId1}/${userId2}`
      );
      setMessages(result.data.messages as Message[]);
      dispatch(
        setSelectedConversation({
          ...result.data.otherUser,
          userId: Number(userId2),
        })
      );
    };
    fetchDirectMessage();
  }, [dispatch, userId1, userId2]);

  useEffect(() => {
    messageRef.current?.scrollTo(0, messageRef.current.scrollHeight);
  }, [messages]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newMessage = (
        await axios.post("http://localhost:3001/api/messages", {
          sentUserId: user.userId,
          receivedUserId: selectedConversation.userId,
          textContent,
        })
      ).data as Message;
      setTextContent("");
      setMessages([...messages, newMessage]);
      if (userExists) {
        dispatch(
          setSelectedConversation({
            ...selectedConversation,
          })
        );
      } else {
        dispatch(
          appendConversation({
            displayName: selectedConversation.displayName,
            username: selectedConversation.username,
            textContent: "",
            timestamp: new Date().toString(),
            otherUserId: Number(userId2),
          })
        );
      }
      dispatch(
        updateConversation({
          displayName: selectedConversation.displayName,
          otherUserId: selectedConversation.userId,
          textContent: newMessage.textContent,
          timestamp: newMessage.timestamp,
          username: selectedConversation.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      direction="row"
      sx={styles.root}
      divider={<Divider flexItem orientation="vertical" />}
    >
      <ConversationList />
      <Box sx={styles.directMessageContainer}>
        <Box sx={styles.headerContainer}>
          <Box sx={styles.headerContent}>
            <Box>
              <Avatar />
            </Box>
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
        <Divider flexItem />
        <Box sx={styles.chatContainer}>
          <List component="div" ref={messageRef} sx={styles.messageList}>
            {messages.map((o) => (
              <ListItem component="div" key={o.messageId}>
                <ListItemText
                  sx={
                    o.sentUserId === user.userId
                      ? styles.sentMessage
                      : styles.message
                  }
                  disableTypography
                  primary={
                    <Box
                      sx={
                        o.sentUserId === user.userId
                          ? styles.sentMessageText
                          : styles.messageText
                      }
                    >
                      <Typography variant="body2">{o.textContent}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography sx={styles.timestamp} variant="caption">
                      {o.timestamp}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <form onSubmit={onSubmit}>
            <Box sx={styles.chatInputContainer}>
              <TextField
                autoComplete="off"
                fullWidth
                hiddenLabel
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <AddPhotoAlternateOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <EmojiEmotionsOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <GifBoxOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" disabled={!textContent.trim()}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Send a message"
                size="small"
                value={textContent}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Stack>
  );
};

export default DirectMessage;
