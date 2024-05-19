import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { appendPost } from "../../state/slices/postsSlice";
import UserAvatar from "../Common/UserAvatar";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

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
  const testRef = useRef(null);
  const user = useAppSelector((state) => state.user);
  const twitterEmojiStyle = EmojiStyle.TWITTER;
  const [showEmojiPicker, setShowEmojiPicker2] = useState(false);

  const clickOffEmojiPicker =
    (showEmojiPicker: boolean) => (event: MouseEvent) => {
      if (
        emojiContainerRef.current &&
        !emojiContainerRef.current.contains(event.target as Node) &&
        testRef.current &&
        !testRef.current.contains(event.target as Node)
      ) {
        console.log("in emoji picker");
        setShowEmojiPicker2(false);
      }
    };

  useEffect(() => {
    const handleClick = clickOffEmojiPicker(true);
    document.body.addEventListener("mousedown", handleClick);
    return () => {
      const handleClick = clickOffEmojiPicker(false);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <IconButton
        ref={testRef}
        id="emoji-button"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          setShowEmojiPicker2(!showEmojiPicker);
        }}
      >
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
      {showEmojiPicker && (
        <Box sx={emojiContainerStyle} ref={emojiContainerRef} tabIndex={0}>
          <EmojiPicker
            style={styles.emojiPicker}
            emojiStyle={twitterEmojiStyle}
            onEmojiClick={setPostContent}
            previewConfig={{ showPreview: false }}
          />
        </Box>
      )}
    </>
  );
};

export default ClickOffEmojis;
