import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, Link as Routerlink, useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import { EmojiClickData } from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import ConversationList from "../components/Messages/ConversationList";
import {
  appendConversation,
  setSelectedConversation,
  updateConversation,
} from "../state/slices/messagesSlice";
import NavBar from "../components/NavBar/NavBar";
import UserAvatar from "../components/Common/UserAvatar";
import EmojiPickerIconButton from "../components/Common/EmojiPickerIconButton";
import TooltipTimestamp from "../components/Common/TooltipTimestamp";
import formatTimestamp from "../utilities/formatTimestamp";
import PageLoader from "./PageLoader";

const styles = {
  avatar: {
    height: 64,
    marginBottom: 0.5,
    width: 64,
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
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
  bioContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  container: { height: "auto", justifyContent: "center" },
  chatContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflowY: "hidden",
  },
  chatInputContainer: {
    boxSizing: "border-box",
    padding: 1,
    position: "relative",
    width: "100%",
  },
  directMessageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  divider: { height: "auto" },
  headerContainer: {
    alignItems: "center",
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
  messageList: { flex: 1, overflowY: "scroll", paddingTop: 0 },
  messageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "primary.light",
  },
  middleContent: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: { flex: "0 0 275px", height: "100vh", position: "sticky", top: 0 },
  rightContent: {
    height: "100vh",
    flex: "0 0 600px",
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

export type Message = {
  messageId: number;
  timestamp: string;
  textContent: string;
  sentUserId: number;
  receivedUserId: number;
};

const DirectMessage = () => {
  const theme = useTheme();
  const { userId1, userId2 } = useParams();
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useAppSelector((state) => state.user);
  const { selectedConversation, conversations } = useAppSelector(
    (state) => state.messages,
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const userExists = conversations.find(
    (o) => o.otherUserId === Number(userId2),
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDirectMessage = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `http://localhost:3001/api/messages/${userId1}/${userId2}`,
        );
        setMessages(result.data.messages as Message[]);
        dispatch(
          setSelectedConversation({
            ...result.data.otherUser,
            userId: Number(userId2),
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
          }),
        );
      } else {
        dispatch(
          appendConversation({
            displayName: selectedConversation.displayName,
            username: selectedConversation.username,
            textContent: "",
            timestamp: new Date().toString(),
            otherUserId: Number(userId2),
          }),
        );
      }
      dispatch(
        updateConversation({
          displayName: selectedConversation.displayName,
          otherUserId: selectedConversation.userId,
          textContent: newMessage.textContent,
          timestamp: newMessage.timestamp,
          username: selectedConversation.username,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" sx={styles.divider} />}
      sx={styles.container}
    >
      <Box component="header" sx={styles.nav}>
        <NavBar />
      </Box>
      <Box sx={styles.middleContent}>
        <ConversationList />
      </Box>
      <Box sx={styles.rightContent}>
        <Box sx={styles.directMessageContainer}>
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
          <Box sx={styles.chatContainer}>
            <List component="div" ref={messageRef} sx={styles.messageList}>
              <Box
                onClick={() => navigate(`/${selectedConversation.username}`)}
                sx={styles.bioContainer}
              >
                {loading && <PageLoader />}
                {!loading && (
                  <Box sx={styles.bioContent}>
                    <Box sx={styles.nameContainer}>
                      <Avatar sx={styles.avatar} />
                      <Link
                        color={theme.typography.subtitle1.color}
                        component={Routerlink}
                        to={`/${selectedConversation.username}`}
                        underline="hover"
                        variant="subtitle1"
                      >
                        {selectedConversation.displayName}
                      </Link>
                      <Typography variant="subtitle2">
                        {`@${selectedConversation.username}`}
                      </Typography>
                    </Box>
                    {selectedConversation.bio && (
                      <Typography>{selectedConversation.bio}</Typography>
                    )}
                    <Typography variant="body2">
                      {selectedConversation.joinedDate &&
                        `Joined
                          ${formatTimestamp(
                            selectedConversation.joinedDate,
                          )} • `}
                      {`${selectedConversation.followerCount ?? 0} Followers`}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Divider />
              {messages.map((o) => (
                <ListItem component="div" key={o.messageId}>
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={
                          o.sentUserId === user.userId
                            ? styles.sentMessageText
                            : styles.messageText
                        }
                      >
                        <Typography>{o.textContent}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={styles.timestamp}>
                        <TooltipTimestamp
                          timestamp={o.timestamp}
                          variant="body2"
                        />
                      </Box>
                    }
                    sx={
                      o.sentUserId === user.userId
                        ? styles.sentMessage
                        : styles.message
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
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Send a message"
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <AddPhotoAlternateOutlinedIcon />
                          </IconButton>
                          <EmojiPickerIconButton
                            onEmojiClick={(emoji: EmojiClickData) => {
                              setTextContent(
                                (prevContent) => prevContent + emoji.emoji,
                              );
                            }}
                            topPosition
                          />
                          <IconButton>
                            <GifBoxOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={!textContent.trim()}
                            type="submit"
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  value={textContent}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default DirectMessage;
