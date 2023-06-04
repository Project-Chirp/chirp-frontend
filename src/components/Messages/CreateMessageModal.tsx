import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SearchBarMessages from "./SearchBarMessages";
import MessagesModalList from "./MessagesModalList";

const styles = {
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    padding: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
    display: "flex",
    alignItems: "center",
  },
  modalHeader: { paddingLeft: 5, width: "100%" },
  headerTitle: {
    fontWeight: "bold",
  },
};

type CreateMessageModalProps = {
  onClose: () => void;
  openModal: boolean;
};

export default function CreateMessageModal({
  onClose,
  openModal,
}: CreateMessageModalProps) {
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.modalHeader}>
          <Typography sx={styles.headerTitle}>New Message</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <SearchBarMessages placeholder="Start a conversation" />

        <MessagesModalList />
      </DialogContent>
    </Dialog>
  );
}
