import { Box } from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";

const styles = {
  rightContent: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    width: "310px",
    height: "100vh",
    paddingLeft: "40px",
    alignItems: "center",
    gap: 2,
  },
  searchBarContainer: {
    width: "100%",
    height: "5%",
  },
  mutualFriendsContainer: {
    width: "100%",
    height: "45%",
    backgroundColor: "gray.light",
    borderRadius: 5,
  },
  adSpaceContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "gray.light",
    borderRadius: 5,
    marginTop: 0,
  },
  footerContainer: {
    width: "100%",
    height: "5%",
    backgroundColor: "gray.light",
  },
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Chirp" />
      </Box>
      <Box sx={styles.mutualFriendsContainer}></Box>
      <Box sx={styles.adSpaceContainer}></Box>
      <Box sx={styles.footerContainer}></Box>
    </Box>
  );
};

export default SideBar;
