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
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import ConversationList from "../components/Messages/ConversationList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import SearchBar from "../components/Common/SearchBar";
import InfoIcon from "@mui/icons-material/Info";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";

const styles = {
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
  directMessageActivityContainer: {
    width: "50%",
  },
  directMessageActivityHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 2,
  },
  message: { display: "flex", flexDirection: "column" },
  sentMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
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
  const selectedConversation = useAppSelector((state) => state.messages);

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
    <Stack direction="row" sx={styles.root}>
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
      <Divider flexItem orientation="vertical" />
      <Box sx={styles.directMessageActivityContainer}>
        <Box sx={styles.directMessageActivityHeader}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <InfoIcon />
          </IconButton>
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List component="div" sx={{ flexGrow: 1 }}>
            {messages.map((o, index) => (
              <ListItem component="div" key={index}>
                <ListItemText
                  sx={
                    o.sentUserId === user.userId
                      ? styles.sentMessage
                      : styles.message
                  }
                  disableTypography
                  primary={
                    <Typography variant="body2">{o.textContent}</Typography>
                  }
                  secondary={
                    <Typography variant="caption">{o.timestamp}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              padding: 1,
              alignSelf: "flex-end",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <TextField
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
                    <IconButton>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              multiline
              hiddenLabel
              placeholder="Send a message"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
              size="small"
            />
          </Box>
        </Box>
      </Box>
      <Divider flexItem orientation="vertical" />
    </Stack>
  );
};

export default DirectMessage;
