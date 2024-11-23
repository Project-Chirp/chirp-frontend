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
import { useAppSelector } from "../../state/hooks";
import { EditableProfileContents } from "../../pages/Profile";
import useAxios from "../../utilities/useAxios";
import dayjs from "dayjs";

const styles = {
  dialog: {
    borderRadius: 5,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  textField: { sx: { borderRadius: 2 } },
  textFieldContainer: { padding: 2 },
  titleBox: { paddingLeft: 3 },
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
  const [birthDateValue, setBirthDateValue] = useState(
    dayjs(birthDate || new Date())
  );
  const [displayNameValue, setDisplayNameValue] = useState(displayName);
  const user = useAppSelector((state) => state.user);
  const { loading, error, sendRequest } = useAxios(); // TODO: use loading/error

  const saveProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await sendRequest({
        endpoint: "profile",
        method: "PUT",
        body: {
          bio: bioValue,
          birthDate: birthDateValue,
          displayName: displayNameValue,
          userId: user.userId,
        },
      });
      onSubmit({
        bio: bioValue,
        birthDate: birthDateValue.toString(),
        displayName: displayNameValue,
      });
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
              slotProps={{ input: styles.textField }}
              variant="outlined"
              value={displayNameValue}
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              label="Bio"
              onChange={(e) => setBioValue(e.target.value)}
              multiline
              rows={2}
              slotProps={{ input: styles.textField }}
              variant="outlined"
              value={bioValue}
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birth Date"
                maxDate={dayjs(new Date())}
                onChange={(value) => {
                  value && setBirthDateValue(value);
                }}
                slotProps={{
                  textField: { placeholder: "Birth Date", variant: "outlined" },
                }}
                value={dayjs(birthDateValue)}
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
