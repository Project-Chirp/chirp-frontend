import { Box, Typography, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FollowListModalProps = {
  open: boolean;
  handleClose: () => void;
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
  dialog: {
    borderRadius: 5,
  },
};

const FollowListModal = ({ open, handleClose }: FollowListModalProps) => {
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open={open}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <Box sx={styles.header}>
        <Typography variant="h6">Followers</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {/* Additional stuff goes here */}
    </Dialog>
  );
};

export default FollowListModal;
