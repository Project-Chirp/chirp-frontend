import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material/";

const styles = {
  dialogPosition: {
    position: "absolute",
    bottom: "500px",
  },
};

type ModalProps = {
  children: ReactElement<any, any>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function PostButtonModal(props: ModalProps) {
  const { children, openModal, setOpenModal } = props;
  return (
    <Dialog
      open={openModal}
      fullWidth
      scroll="paper"
      sx={styles.dialogPosition}
      PaperProps={{
        style: {
          minHeight: "20%",
          maxHeight: "90%",
        },
      }}
    >
      <DialogTitle>
        <Button color="greyButton" onClick={() => setOpenModal(!openModal)}>
          X
        </Button>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
