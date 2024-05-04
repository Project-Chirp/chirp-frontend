import {
  Box,
  Button,
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
import NavBar from "../components/NavBar/NavBar";
import formatTimestamp from "../utilities/formatTimestamp";
import UserAvatar from "../components/Common/UserAvatar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../utilities/queryClient";
import PageLoader from "./PageLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const styles = {
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
    width: "100%",
  },
  directMessageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  divider: { height: "auto" },
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
  messageList: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
  },
  messageText: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#cce3d9",
  },
  middleContent: { flex: "0 0 350px", height: "100vh", minWidth: 0 },
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

  const fetchUser = async () => {
    try {
      const otherUser = await axios.get(
        `http://localhost:3001/api/messages/${userId2}`
      );

      dispatch(
        setSelectedConversation({
          ...otherUser.data,
          userId: Number(userId2),
        })
      );
    } catch (error) {
      console.log("error fetching user data:", error);
    }
  };

  const fetchDirectMessage = async ({ pageParam = 1 }) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/messages/${userId1}/${userId2}?offset=${pageParam}`
      );

      if (pageParam > 1) {
        setMessages([...messages, ...result.data] as Message[]);
      } else {
        setMessages(result.data as Message[]);
      }

      return result.data;
    } catch (error) {
      console.log("error fetching posts:", error);
    }
  };

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: fetchDirectMessage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    queryClient.clear();
    fetchDirectMessage({ pageParam: 1 });
    fetchUser();
  }, [userId2]);

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
      setMessages([newMessage, ...messages]);
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
      messageRef.current?.scrollTo(0, messageRef.current.scrollHeight);
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <div>{error.message}</div>;

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
          <Divider />
          <Box sx={styles.chatContainer}>
            <List
              component="div"
              ref={messageRef}
              sx={styles.messageList}
              id="scrollable"
            >
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchNextPage}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                inverse={true}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
                scrollableTarget={"scrollable"}
              >
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
                        <Box
                          sx={
                            o.sentUserId === user.userId
                              ? styles.sentMessageText
                              : styles.messageText
                          }
                        >
                          <Typography variant="body2">
                            {o.textContent}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography sx={styles.timestamp} variant="caption">
                          {formatTimestamp(o.timestamp)}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </InfiniteScroll>
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
                        <IconButton
                          type="submit"
                          disabled={!textContent.trim()}
                        >
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
      </Box>
    </Stack>
  );
};

export default DirectMessage;
