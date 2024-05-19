import { Box, IconButton } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState, useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

type EmojiPickerIconButtonProps = {
  onEmojiClick: (emoji: EmojiClickData) => void;
};

const styles = {
  emojiContainer: { position: "absolute", top: 150, zIndex: 1 },
  emojiPicker: {
    height: 300,
    width: 250,
    "--epr-emoji-size": "25px",
  },
};

const EmojiPickerIconButton = ({
  onEmojiClick,
}: EmojiPickerIconButtonProps) => {
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const emojiIconButtonRef = useRef<HTMLButtonElement>(null);
  const twitterEmojiStyle = EmojiStyle.TWITTER;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleClick = (event: MouseEvent) => {
    if (
      emojiContainerRef.current &&
      !emojiContainerRef.current.contains(event.target as Node) &&
      emojiIconButtonRef.current &&
      !emojiIconButtonRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <IconButton
        ref={emojiIconButtonRef}
        size="small"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
      <Box sx={styles.emojiContainer} ref={emojiContainerRef}>
        <EmojiPicker
          emojiStyle={twitterEmojiStyle}
          onEmojiClick={onEmojiClick}
          open={showEmojiPicker}
          previewConfig={{ showPreview: false }}
        />
      </Box>
    </>
  );
};

export default EmojiPickerIconButton;
