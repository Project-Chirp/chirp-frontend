import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  dialog: {
    maxHeight: "90%",
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContent: {
    padding: 0,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogTitle: {
    paddingX: 0.5,
    paddingY: 0,
  },
};

type PostButtonModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
  openModal: boolean;
};

export default function PostButtonModal({
  children,
  onClose,
  openModal,
}: PostButtonModalProps) {
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
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>{children}</DialogContent>
    </Dialog>
  );
}
