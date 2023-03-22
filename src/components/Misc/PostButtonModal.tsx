import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material/";

type ModalProps = {
  children: ReactElement<any, any>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function PostButtonModal(props: ModalProps) {
  const { children, openModal, setOpenModal } = props;
  return (
    <Dialog open={openModal}>
      <DialogTitle>
        <Button color="greyButton" onClick={() => setOpenModal(!openModal)}>
          X
        </Button>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
