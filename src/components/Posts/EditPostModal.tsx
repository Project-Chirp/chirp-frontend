import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type EditPostModalProps = {
  onClose: () => void;
  open: boolean;
  //   postId: number;
  //   isExpandedPost?: boolean;
};

const styles = {
  dialog: {
    height: "auto",
    width: "35%",
    borderRadius: 5,
    padding: 1,
  },
  title: {
    padding: 1,
  },
};

const EditPostModal = ({ onClose, open }: EditPostModalProps) => {
  const handleUpdate = async () => {};
  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: styles.dialog }}>
      <DialogTitle sx={styles.title} variant="h6">
        Are you sure you want to edit this post?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleUpdate} variant="outlined" color="error">
          Edit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
