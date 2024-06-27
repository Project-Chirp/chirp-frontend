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
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3" sx={styles.titleText}>
          New Message
        </Typography>
      </DialogTitle>
      <MessagesSearchBar
        placeholder="Search following"
        onSelect={onSelect}
        onSearchClose={() => setFocusSearchBar(false)}
        onSearchOpen={() => setFocusSearchBar(true)}
      />
      <DialogContent>
        {!focusSearchBar && <MessagesModalList onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
