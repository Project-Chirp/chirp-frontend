import { Box, Typography } from "@mui/material";
import React from "react";
import SearchBar from "../Common/SearchBar";

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
    display: "flex",
    flexDirection: "column",
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
  mfHeader: {
    width: "100%",
  },
  headerTitle: {
    paddingX: 2,
    paddingY: 1,
    fontWeight: "bold",
  },
  mfList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: 1,
  },
  friendItem: {},
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Chirp" />
      </Box>
      <Box sx={styles.mutualFriendsContainer}>
        <Box sx={styles.mfHeader}>
          <Typography variant="h6" sx={styles.headerTitle}>
            Who to follow
          </Typography>
        </Box>
        <Box sx={styles.mfList}>
          <Box sx={styles.friendItem}></Box>
        </Box>
      </Box>
      <Box sx={styles.adSpaceContainer}></Box>
      <Box sx={styles.footerContainer}></Box>
    </Box>
  );
};

export default SideBar;
