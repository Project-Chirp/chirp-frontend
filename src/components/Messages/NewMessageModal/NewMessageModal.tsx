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
import { BaseUser } from "../../../types/users";
import UserSearchBar from "../../Common/UserSearchBar";
import NewMessageModalList from "./NewMessageModalList";

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
  listBox: {
    maxHeight: "450px",
  },
  searchBarContainer: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
};

type NewMessageModalProps = {
  activeConversations: BaseUser[];
  onClose: () => void;
  open: boolean;
};

const NewMessageModal = ({
  activeConversations,
  onClose,
  open,
}: NewMessageModalProps) => {
  const [showUserList, setShowUserList] = useState(true);
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
      <Box sx={styles.searchBarContainer}>
        <UserSearchBar
          listBoxStyle={styles.listBox}
          onBlur={() => setShowUserList(true)}
          onFocus={() => setShowUserList(false)}
          onSelect={(o) => onSelectUser(o.userId)}
        />
      </Box>
      <DialogContent>
        {showUserList && (
          <NewMessageModalList
            activeConversations={activeConversations}
            onSelect={(o) => onSelectUser(o)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageModal;
