import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material/";
import { useState } from "react";
import NewMessageModalList from "./NewMessageModalList";
import NewMessageModalSearch from "./NewMessageModalSearch";

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
};

type NewMessageModalProps = {
  onClose: () => void;
  open: boolean;
};

const NewMessageModal = ({ onClose, open }: NewMessageModalProps) => {
  const [focusSearchBar, setFocusSearchBar] = useState(false);

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{ sx: styles.dialog }}
      scroll="paper"
    >
      <DialogTitle sx={styles.dialogTitle} variant="h3">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        New Message
      </DialogTitle>
      <NewMessageModalSearch
        onBlur={() => setFocusSearchBar(false)}
        onFocus={() => setFocusSearchBar(true)}
        onSelect={onClose}
      />
      <DialogContent>
        {!focusSearchBar && <NewMessageModalList onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageModal;
