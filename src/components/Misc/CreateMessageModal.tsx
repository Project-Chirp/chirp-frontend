import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

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
  },
};

type PostButtonModalProps = {
  children: JSX.Element;
  onClose: () => void;
  openModal: boolean;
};

export default function CreateMessageModal({
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
