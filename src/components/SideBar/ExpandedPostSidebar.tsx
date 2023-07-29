import { Box } from "@mui/material";
import React from "react";
import SidebarFooter from "./SidebarFooter";
import RelevantUsers from "./RelevantUsers";
import SidebarSearchBar from "./SidebarSearchBar";
import Advertisement from "./Advertisement";

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

const ExpandedPostSidebar = () => {
  return (
    <Box sx={styles.rightContent}>
      <SidebarSearchBar />
      <RelevantUsers />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default ExpandedPostSidebar;
