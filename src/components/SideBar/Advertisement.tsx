import { Box } from "@mui/material";
import React from "react";

const styles = {
  ad: {
    height: "100%",
    width: "100%",
  },
  adSpaceContainer: {
    alignItems: "center",
    backgroundColor: "gray.light",
    border: "5px solid",
    borderColor: "primary.main",
    borderRadius: 5,
    boxSizing: "border-box",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    overflow: "hidden",
    width: "100%",
  },
};

const Advertisement = () => {
  return (
    <Box sx={styles.adSpaceContainer}>
      <img
        style={styles.ad}
        src={process.env.PUBLIC_URL + "/Ad Gray.gif"}
        alt="Advertisement"
      />
    </Box>
  );
};

export default Advertisement;
