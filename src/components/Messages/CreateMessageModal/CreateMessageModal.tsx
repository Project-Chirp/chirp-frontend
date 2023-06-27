import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SearchBarMessages from "./SearchBarMessages";
import MessagesModalList, { OtherUser } from "./MessagesModalList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";

const styles = {
  dialog: {
    height: "60%",
    borderRadius: 4,
  },
  dialogContent: {
    padding: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 1,
    display: "flex",
    alignItems: "center",
  },
  titleBox: { paddingLeft: 3, width: "100%" },
  headerTitle: {
    fontWeight: "bold",
  },
  modalButtonBox: { paddingRight: 2 },
  modalButton: { borderRadius: 10 },
  modalHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

type CreateMessageModalProps = {
  onClose: () => void;
  open: boolean;
};

export default function CreateMessageModal({
  onClose,
  open,
}: CreateMessageModalProps) {
  const user = useAppSelector((state) => state.user);
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [selectedUser, setSelectedUser] = useState<OtherUser>({
    displayName: "",
    otherUserId: -1,
    username: "",
  });

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/messages/${user.userId}/${selectedUser.otherUserId}`;
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
        <Box sx={styles.modalHeader}>
          <Box sx={styles.titleBox}>
            <Typography sx={styles.headerTitle}>New Message</Typography>
          </Box>
        </Box>
      </DialogTitle>
      <SearchBarMessages
        placeholder="Search following"
        selectedUser={selectedUser}
        setSelectedUser={(state) => setSelectedUser(state)}
        setFocusSearchBar={(state) =>
          state ? setFocusSearchBar(state) : setFocusSearchBar(false)
        }
      />
      <DialogContent sx={styles.dialogContent}>
        {!focusSearchBar && <MessagesModalList />}
      </DialogContent>
    </Dialog>
  );
}
