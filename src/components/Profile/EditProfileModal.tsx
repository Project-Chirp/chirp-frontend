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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useAppSelector } from "../../state/hooks";
import { EditableProfileContents } from "../../pages/Profile";

const styles = {
  dialog: {
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
  bio?: string;
  birthDate?: string | Date;
  displayName: string;
  onClose: () => void;
  onSubmit: (editedBio: EditableProfileContents) => void;
  open: boolean;
};

const EditProfileModal = ({
  bio,
  birthDate,
  displayName,
  open,
  onClose,
  onSubmit,
}: EditProfileModalProps) => {
  const [bioValue, setBioValue] = useState(bio);
  const [birthDateValue, setBirthDateValue] = useState(birthDate || new Date());
  const [displayNameValue, setDisplayNameValue] = useState(displayName);
  const user = useAppSelector((state) => state.user);

  const saveProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newBio = await axios.put("http://localhost:3001/api/profile", {
        bio: bioValue,
        birthDate: birthDateValue,
        displayName: displayNameValue,
        userId: user.userId,
      });
      onSubmit(newBio.data);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <form onSubmit={saveProfile}>
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
              onChange={(e) => setDisplayNameValue(e.target.value)}
              variant="outlined"
              value={displayNameValue}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              label="Bio"
              onChange={(e) => setBioValue(e.target.value)}
              multiline
              rows={2}
              variant="outlined"
              value={bioValue}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(props) => (
                  <TextField
                    id="date"
                    placeholder="Birth Date"
                    variant="outlined"
                    {...props}
                  />
                )}
                label="Birth Date"
                maxDate={new Date()}
                onChange={(e) => {
                  e && setBirthDateValue(e);
                }}
                value={birthDateValue}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfileModal;
