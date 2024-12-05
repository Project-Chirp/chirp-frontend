import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import MessagesModalList from "./MessagesModalList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import MessagesSearchBar from "./MessagesSearchBar";

const styles = {
  dialog: {
    height: "60%",
    borderRadius: 5,
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    paddingY: 1,
    gap: 3,
  },
  titleText: { paddingLeft: 3 },
};

type CreateMessageModalProps = {
  onClose: () => void;
  open: boolean;
};

export default function CreateMessageModal({
  onClose,
  open,
}: CreateMessageModalProps) {
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const onSelect = (otherUserId: number) => {
    onClose();
    const path = `/messages/${user.userId}/${otherUserId}`;
    navigate(path);
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{ sx: styles.dialog }}
      scroll="paper"
    >
      <DialogTitle variant="h3" sx={styles.dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        New Message
      </DialogTitle>
      <MessagesSearchBar
        onSearchClose={() => setFocusSearchBar(false)}
        onSearchOpen={() => setFocusSearchBar(true)}
        onSelect={onSelect}
        placeholder="Search following"
      />
      <DialogContent>
        {!focusSearchBar && <MessagesModalList onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
