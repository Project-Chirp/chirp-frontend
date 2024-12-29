import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  appendConversation,
  Message,
  setMessages,
  setSelectedConversation,
  updateConversation,
} from "../../state/slices/messagesSlice";
import useAxios from "../../utilities/useAxios";
import EmojiPickerIconButton from "../Common/EmojiPickerIconButton";

const styles = {
  chatInputContainer: {
    boxSizing: "border-box",
    padding: 1,
    position: "relative",
    width: "100%",
  },
};

const ChatInput = () => {
  const [textContent, setTextContent] = useState("");

  const user = useAppSelector((state) => state.user);
  const { conversations, messages, selectedConversation } = useAppSelector(
    (state) => state.messages,
  );
  const dispatch = useAppDispatch();

  const { userId2 } = useParams();
  const { sendRequest } = useAxios();

  const userExists = conversations.find(
    (o) => o.otherUserId === Number(userId2),
  );

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newMessage = (await sendRequest(
        {
          method: "POST",
          data: {
            receivedUserId: selectedConversation.userId,
            textContent,
            sentUserId: user.userId,
          },
        },
        "messages",
      )) as Message;
      setTextContent("");
      dispatch(setMessages([...messages, newMessage]));
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
                  <IconButton disabled={!textContent.trim()} type="submit">
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
  );
};

export default ChatInput;
