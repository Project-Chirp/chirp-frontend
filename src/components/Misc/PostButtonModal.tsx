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
    paddingTop: 0,
    paddingRight: 0.5,
    paddingLeft: 0.5,
  },
};

type PostButtonModalProps = {
  children: JSX.Element;
  openModal: boolean;
  onClose: () => void;
};

export default function PostButtonModal({
  children,
  openModal,
  onClose,
}: PostButtonModalProps) {
  return (
    <Dialog
      open={openModal}
      fullWidth
      scroll="paper"
      sx={styles.dialog}
      onClose={onClose}
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
