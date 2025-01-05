import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import SearchBarDropDown from "../../Common/SearchBarDropdown";
import NewMessageModalList from "./NewMessageModalList";

const styles = {
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
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
  listBox: {
    maxHeight: "450px",
  },
};

type NewMessageModalProps = {
  onClose: () => void;
  open: boolean;
};

const NewMessageModal = ({ onClose, open }: NewMessageModalProps) => {
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const onSelectUser = (otherUserId: number) => {
    onClose();
    const path = `/messages/${userId}/${otherUserId}`;
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
      <DialogTitle sx={styles.dialogTitle} variant="h3">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        New Message
      </DialogTitle>
      <Box sx={styles.box}>
        <SearchBarDropDown
          listBoxStyle={styles.listBox}
          onBlur={() => setFocusSearchBar(false)}
          onFocus={() => setFocusSearchBar(true)}
          onSelect={(o) => onSelectUser(o.userId)}
        />
      </Box>
      <DialogContent>
        {!focusSearchBar && (
          <NewMessageModalList onSelect={(o) => onSelectUser(o)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageModal;
