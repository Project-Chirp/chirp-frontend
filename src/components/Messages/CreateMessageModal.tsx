import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SearchBarMessages from "./SearchBarMessages";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  dialog: {
    maxHeight: "90%",
  },
  dialogContent: {
    padding: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0,
    display: "flex",
    alignItems: "center",
  },
  modalHeader: { paddingLeft: 5, width: "100%" },
  headerTitle: {
    fontWeight: "bold",
  },
};

type CreateMessageModalProps = {
  onClose: () => void;
  openModal: boolean;
};

type DMList = {
  displayName: string;
  username: string;
};

export default function CreateMessageModal({
  onClose,
  openModal,
}: CreateMessageModalProps) {
  const user = useAppSelector((state) => state.user);
  const [dmList, setDMList] = useState<DMList[]>([]);

  useEffect(() => {
    const fetchDMList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/dmList",
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setDMList(result.data as DMList[]);
    };
    fetchDMList();
  }, [user]);

  console.log(dmList);
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.modalHeader}>
          <Typography sx={styles.headerTitle}>New Message</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <SearchBarMessages placeholder="Start a conversation" />
      </DialogContent>
    </Dialog>
  );
}
