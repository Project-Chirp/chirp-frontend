import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  dialog: {
    maxHeight: "90%",
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
  },
  paperProps: {
    overflow: "visible",
    borderRadius: 20,
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
      PaperProps={{ style: styles.paperProps }}
    >
      <DialogTitle>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>{children}</DialogContent>
    </Dialog>
  );
}
