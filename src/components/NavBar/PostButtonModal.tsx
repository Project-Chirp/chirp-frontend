import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  dialog: {
    ".MuiDialog-scrollPaper": { alignItems: "flex-start" },
  },
  dialogContent: { overflow: "visible" },
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
      PaperProps={{ style: styles.paperProps }}
      scroll="paper"
      sx={styles.dialog}
    >
      <DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>{children}</DialogContent>
    </Dialog>
  );
}
