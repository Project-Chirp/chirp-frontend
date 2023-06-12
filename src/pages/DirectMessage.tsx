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
import { useAppSelector } from "../state/hooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import ConversationList from "../components/Messages/ConversationList";

const styles = {
  directMessageActivityContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  directMessageActivityHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
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
    backgroundColor: "#22AA6F",
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
  const [textContent, setTextContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useAppSelector((state) => state.user);
  const selectedConversation = useAppSelector((state) => state.messages);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDirectMessage = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/messages/${userId1}/${userId2}`
      );
      setMessages(result.data as Message[]);
    };
    fetchDirectMessage();
  }, [userId1, userId2]);

  useEffect(() => {
    // TODO: See if this is the best way to scroll to the bottom, and check edge cases
    if (messageRef.current) {
      messageRef.current.scrollTo(0, messageRef.current.scrollHeight);
    }
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack direction="row" sx={styles.root}>
      <ConversationList />
      <Divider flexItem orientation="vertical" />
      <Box sx={styles.directMessageActivityContainer}>
        <Box sx={styles.directMessageActivityHeader}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Box sx={{ padding: 1 }}>
              <Avatar />
            </Box>
            <Box sx={{ padding: 1 }}>
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
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflowY: "hidden",
          }}
        >
          <List
            component="div"
            ref={messageRef}
            sx={{ flex: 1, overflowY: "scroll" }}
          >
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
                    <Typography sx={{ marginTop: 0.5 }} variant="caption">
                      {o.timestamp}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              alignSelf: "flex-end",
              boxSizing: "border-box",
              padding: 1,
              width: "100%",
            }}
          >
            <form onSubmit={onSubmit}>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
                value={textContent}
              />
            </form>
          </Box>
        </Box>
      </Box>
      <Divider flexItem orientation="vertical" />
    </Stack>
  );
};

export default DirectMessage;
