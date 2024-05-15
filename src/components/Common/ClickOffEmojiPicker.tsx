import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { click } from "@testing-library/user-event/dist/click";

type ClickOffProps = {
  setPostContent: (emoji: EmojiClickData) => void;
  setShowEmojiPicker: () => void;
  emojiContainerStyle: {};
  //add width, height make it optional
};

const styles = {
  emojiContainer: { position: "absolute", zIndex: 1 },
  emojiPicker: {
    height: 300,
    width: 250,
    "--epr-emoji-size": "25px",
  },
};

const ClickOffEmojis = ({
  setPostContent,
  setShowEmojiPicker,
  emojiContainerStyle,
}: ClickOffProps) => {
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user);
  const twitterEmojiStyle = EmojiStyle.TWITTER;

  const clickOffEmojiPicker =
    (showEmojiPicker: boolean) => (event: MouseEvent) => {
      if (
        emojiContainerRef.current &&
        !emojiContainerRef.current.contains(event.target as Node)
      ) {
        console.log("in emoji picker");
        setShowEmojiPicker();
      }
    };

  useEffect(() => {
    const handleClick = clickOffEmojiPicker(true);
    document.body.addEventListener("mouseup", handleClick);
    return () => {
      const handleClick = clickOffEmojiPicker(false);
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

  return (
    <Box sx={emojiContainerStyle} ref={emojiContainerRef} tabIndex={0}>
      <EmojiPicker
        style={styles.emojiPicker}
        emojiStyle={twitterEmojiStyle}
        onEmojiClick={setPostContent}
        previewConfig={{ showPreview: false }}
      />
    </Box>
  );
};

export default ClickOffEmojis;
