import { Box, Typography, Link } from "@mui/material";
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
    boxSizing: "border-box",
    border: "5px solid",
    borderColor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    width: "100%",
    height: "5%",
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
  adTitle: {
    fontWeight: "bold",
    color: "primary.main",
    textAlign: "center",
  },
  footerNav: {
    paddingX: 2,
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  footerItem: {
    cursor: "pointer",
    paddingRight: "0.75rem",
    color: "gray.main",
  },
  footerItemText: {
    fontSize: "0.75rem",
  },
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
      <Box sx={styles.adSpaceContainer}>
        <Typography variant="h4" sx={styles.adTitle}>
          Your Advertisement Here
        </Typography>
      </Box>
      <Box sx={styles.footerContainer}>
        <Box sx={styles.footerNav}>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Terms of Service
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Privacy Policy
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              About Us
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Contact Us
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              GitHub Repo
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Documentation
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
