import { Box, Typography, Link } from "@mui/material";
import React from "react";
import SearchBar from "../Common/SearchBar";

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
  adTitle: {
    color: "primary.main",
    fontWeight: "bold",
    textAlign: "center",
  },
  footerContainer: {
    height: "5%",
    width: "100%",
  },
  footerItem: {
    color: "gray.main",
    paddingRight: "0.75rem",
  },
  footerItemText: {
    fontSize: "0.75rem",
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    paddingX: 2,
  },
  headerTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingY: 1,
  },
  mfHeader: {
    width: "100%",
  },
  mfList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: 1,
  },
  mutualFriendsContainer: {
    backgroundColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: "45%",
    width: "100%",
  },
  rightContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    paddingLeft: "40px",
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
      <Box sx={styles.mutualFriendsContainer}>
        <Box sx={styles.mfHeader}>
          <Typography variant="h6" sx={styles.headerTitle}>
            Who to follow
          </Typography>
        </Box>
        <Box sx={styles.mfList}>
          <Box></Box>
        </Box>
      </Box>
      <Box sx={styles.adSpaceContainer}>
        <img
          style={styles.ad}
          src={process.env.PUBLIC_URL + "/Ad.gif"}
          alt="Logo"
        />
      </Box>
      <Box sx={styles.footerContainer}>
        <Box sx={styles.footerNav}>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Terms of Service
            </Typography>
          </Link>
          <Link underline="hover" target="_blank" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Privacy Policy
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Contact Us
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              About The Team
            </Typography>
          </Link>
          <Link
            underline="hover"
            target="_blank"
            href="https://github.com/orgs/TweetClone/repositories"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              GitHub Repo
            </Typography>
          </Link>
          <Link underline="hover" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Docs
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
