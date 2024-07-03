import {
  Box,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

type user = {
  userName: string;
  displayName: string;
  imageURL: string;
  isFollowing: boolean;
};

type FollowListModalProps = {
  openModal: boolean;
  onClose: () => void;
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

export default function FollowListModal({
  openModal,
  onClose,
}: FollowListModalProps) {
  const [list, setList] = useState<User[]>([]);

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.header}>
        Hello
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        Erm What the Sigma
        {/* Need to create the endpoint to get the user list */}
        {list.map((item) => (
          <Typography key={item.id}>{item.username}</Typography>
        ))}
      </DialogContent>
    </Dialog>
  );
}
