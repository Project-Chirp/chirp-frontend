import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type EditPostModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
  openModal: boolean;
};

// displayName: string;
// followStatus: boolean;
// imagePath?: string;
// isLikedByCurrentUser: boolean;
// isQuotePost?: boolean;
// isRepost?: boolean;
// parentPostId?: number;
// postId: number;
// textContent: string;
// userId: number;
// username: string;

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

const EditPostModal = ({
  onClose,
  openModal,
  children,
}: EditPostModalProps) => {
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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>{children}</DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
