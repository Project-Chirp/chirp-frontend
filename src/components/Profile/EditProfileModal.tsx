import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type EditProfileContents = {
  bio: string;
  displayName?: string;
};

const styles = {
  dialog: {
    height: "60%",
    borderRadius: 5,
  },
  dialogContent: {
    padding: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingX: 0.5,
    paddingTop: 1,
    display: "flex",
    alignItems: "center",
  },
  titleBox: { paddingLeft: 3, width: "100%" },
  headerTitle: {
    fontWeight: "bold",
  },
};

type EditProfileModalProps = {
  editProfileContents: EditProfileContents;
  onClose: () => void;
  open: boolean;
};

export default function EditProfileModal({
  editProfileContents,
  onClose,
  open,
}: EditProfileModalProps) {
  const [bio, setBio] = useState(editProfileContents.bio);
  const [displayName, setDisplayName] = useState(
    editProfileContents.displayName
  );
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.headerTitle}>Edit Profile</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
        >
          <TextField
            label="Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
            variant="outlined"
            value={displayName}
          />
          <TextField
            label="Bio"
            onChange={(e) => setBio(e.target.value)}
            multiline
            variant="outlined"
            value={bio}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
