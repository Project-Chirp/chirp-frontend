import { Box, IconButton } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState, useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

type EmojiPickerIconButtonProps = {
  onEmojiClick: (emoji: EmojiClickData) => void;
  pickerHeight?: number;
  pickerPosition?: "top" | "bottom";
  pickerWidth?: number;
};

const styles = {
  emojiContainer: { position: "absolute", zIndex: 1 },
  emojiPicker: {
    "--epr-emoji-size": "25px",
  },
};

const EmojiPickerIconButton = ({
  onEmojiClick,
  pickerHeight = 450,
  pickerPosition = "bottom",
  pickerWidth = 350,
}: EmojiPickerIconButtonProps) => {
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const emojiIconButtonRef = useRef<HTMLButtonElement>(null);
  const twitterEmojiStyle = EmojiStyle.TWITTER;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const top = pickerPosition === "bottom" ? 150 : -460;

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
      <Box sx={{ ...styles.emojiContainer, top: top }} ref={emojiContainerRef}>
        <EmojiPicker
          emojiStyle={twitterEmojiStyle}
          height={pickerHeight}
          onEmojiClick={onEmojiClick}
          open={showEmojiPicker}
          previewConfig={{ showPreview: false }}
          style={styles.emojiPicker as React.CSSProperties}
          width={pickerWidth}
        />
      </Box>
    </>
  );
};

export default EmojiPickerIconButton;
