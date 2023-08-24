import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
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
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingX: 0.5,
    paddingTop: 1,
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  textFieldContainer: { paddingX: 2, paddingY: 1.5 },
  titleBox: { paddingLeft: 3, width: "100%" },
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
  console.log(bio);
  return (
    <form>
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
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              label="Display Name"
              onChange={(e) => setDisplayName(e.target.value)}
              variant="outlined"
              value={displayName}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              label="Bio"
              onChange={(e) => setBio(e.target.value)}
              multiline
              variant="outlined"
              value={bio}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Save</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
