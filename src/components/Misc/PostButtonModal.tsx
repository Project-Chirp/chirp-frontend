import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material/";

type ModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function PostButtonModal(props: ModalProps) {
  const { openModal, setOpenModal } = props;
  return (
    <Dialog open={openModal}>
      <DialogTitle>
        <Button color="greyButton" onClick={() => setOpenModal(!openModal)}>
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>content goes here.</div>
      </DialogContent>
    </Dialog>
  );
}
