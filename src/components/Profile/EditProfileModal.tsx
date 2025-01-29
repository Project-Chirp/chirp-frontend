import CloseIcon from "@mui/icons-material/Close";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { EditableProfileContent } from "../../types/profile";
import useAxios from "../../utilities/useAxios";

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
  onSubmit: (editedBio: EditableProfileContent) => void;
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
    dayjs(birthDate || new Date()),
  );
  const [displayNameValue, setDisplayNameValue] = useState(displayName);
  const user = useAppSelector((state) => state.user);
  const { sendRequest } = useAxios();

  const saveProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await sendRequest(
        {
          method: "PUT",
          data: {
            bio: bioValue,
            birthDate: birthDateValue,
            displayName: displayNameValue,
            userId: user.userId,
          },
        },
        "profile",
      );
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
      PaperProps={{ sx: styles.dialog }}
      scroll="paper"
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
              value={displayNameValue}
              variant="outlined"
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <TextField
              fullWidth
              label="Bio"
              multiline
              onChange={(e) => setBioValue(e.target.value)}
              rows={2}
              slotProps={{ input: styles.textField }}
              value={bioValue}
              variant="outlined"
            />
          </Box>
          <Box sx={styles.textFieldContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birth Date"
                maxDate={dayjs(new Date())}
                onChange={(value) => {
                  if (value) {
                    setBirthDateValue(value);
                  }
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
