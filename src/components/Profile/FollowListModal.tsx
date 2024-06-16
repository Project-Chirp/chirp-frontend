import { Modal, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const styles = {
  header: {},
};
const FollowListModal = () => {
  // const [openModal, setOpenModal] = useState(false);
  return (
    <Box>
      <Box sx={styles.header}>
        <Typography> Followers</Typography>
        <CloseIcon></CloseIcon>
      </Box>
      {/* <Modal openModal = {openModal}></Modal> */}
    </Box>
  );
};

export default FollowListModal;
