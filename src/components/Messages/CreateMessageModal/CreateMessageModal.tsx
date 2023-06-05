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
  modalHeader: { paddingLeft: 3, width: "100%" },
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
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.modalHeader}>
          <Typography sx={styles.headerTitle}>New Message</Typography>
        </Box>
      </DialogTitle>
      <SearchBarMessages placeholder="Start a conversation" />
      <DialogContent sx={styles.dialogContent}>
        <MessagesModalList />
      </DialogContent>
    </Dialog>
  );
}
