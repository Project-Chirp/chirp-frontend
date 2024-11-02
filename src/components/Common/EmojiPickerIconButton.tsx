import { Box, IconButton } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

type EmojiPickerIconButtonProps = {
  onEmojiClick: (emoji: EmojiClickData) => void;
  pickerHeight?: number;
  pickerWidth?: number;
  topPosition?: boolean;
};

const styles = {
  emojiContainer: { position: "absolute", zIndex: 1, overflow: "visible" },
  emojiPicker: {
    "--epr-emoji-size": "25px",
  },
  activeButton: {
    color: "primary.main",
  },
};

const EmojiPickerIconButton = ({
  onEmojiClick,
  pickerHeight = 350,
  pickerWidth = 300,
  topPosition = false,
}: EmojiPickerIconButtonProps) => {
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const emojiIconButtonRef = useRef<HTMLButtonElement>(null);
  const twitterEmojiStyle = EmojiStyle.TWITTER;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const top = topPosition ? -(pickerHeight + 6) : 40;

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
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        ref={emojiIconButtonRef}
        size="small"
        sx={{ ...(showEmojiPicker && styles.activeButton) }}
      >
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
      <Box ref={emojiContainerRef} sx={{ ...styles.emojiContainer, top: top }}>
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
