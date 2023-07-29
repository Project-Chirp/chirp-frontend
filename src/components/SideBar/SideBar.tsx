import { Box } from "@mui/material";
import React from "react";
import SuggestedUserItem from "./SuggestedUsers";
import SidebarFooter from "./SidebarFooter";
import Advertisement from "./Advertisement";
import SidebarSearchBar from "./SidebarSearchBar";

const styles = {
  rightContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    position: "fixed",
    width: "310px",
  },
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <SidebarSearchBar />
      <SuggestedUserItem />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
