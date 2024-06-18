import {
  Box,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FollowListModalProps = {
  openModal: boolean;
  onClose: () => void;
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
  dialog: {
    borderRadius: 5,
  },
};

export default function FollowListModal({
  openModal,
  onClose,
}: FollowListModalProps) {
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.header}>
        Followers
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{/* Additional stuff goes here */}Whats up</DialogContent>
    </Dialog>
  );
}
