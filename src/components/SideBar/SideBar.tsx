import { Box } from "@mui/material";
import React from "react";
import SearchBar from "../Common/SearchBar";
import SuggestedUserItem from "./SuggestedUsers";
import SidebarFooter from "./SidebarFooter";

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
    height: "30%",
    justifyContent: "center",
    marginTop: 0,
    overflow: "hidden",
    width: "100%",
  },
  rightContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    position: "fixed",
    width: "310px",
  },
  searchBarContainer: {
    height: "5%",
    width: "100%",
  },
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Chirp" />
      </Box>
      <SuggestedUserItem />
      <Box sx={styles.adSpaceContainer}>
        <img
          style={styles.ad}
          src={process.env.PUBLIC_URL + "/Ad Gray.gif"}
          alt="Advertisement"
        />
      </Box>
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
