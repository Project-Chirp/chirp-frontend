import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material/";

const styles = {
  dialog: {
    maxHeight: "90%",
  },
  greyButton: {
    color: "#D8D8D8",
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
      <DialogTitle>
        <Button sx={styles.greyButton} onClick={onClose}>
          X
        </Button>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
