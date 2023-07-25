import { Box, Typography, Link, Avatar, Button } from "@mui/material";
import React from "react";
import SearchBar from "../Common/SearchBar";
import { useAppSelector } from "../../state/hooks";

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
  followButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.main",
    },
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
    paddingTop: 1,
  },
  relevantUserContainer: {
    border: "2px solid",
    borderColor: "gray.light",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: "14%",
    width: "100%",
    overflow: "hidden",
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
  ruContent: {
    display: "flex",
    flexDirection: "row",
    paddingX: 2,
    paddingY: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#E9EBED",
    },
    border: "none",
    cursor: "pointer",
  },
  ruDisplayName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  ruHeader: {
    width: "100%",
  },
  ruNameLink: {
    color: "black",
  },
  ruNames: { marginLeft: 2, textAlign: "left", marginY: "6px" },
  ruTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingTop: 1,
  },
  ruUsername: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  searchBarContainer: {
    height: "5%",
    width: "100%",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
};

const ExpandedPostSidebar = () => {
  const relevantUser = useAppSelector((state) => state.expandedPost);
  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Chirp" />
      </Box>

      <Box sx={styles.relevantUserContainer}>
        <Box sx={styles.ruHeader}>
          <Typography variant="h6" sx={styles.ruTitle}>
            Relevant People
          </Typography>
        </Box>
        <Box sx={styles.ruContent} className="ruContent">
          <Box sx={styles.userInfo}>
            <Avatar />
            <Box sx={styles.ruNames}>
              <Link
                underline="hover"
                sx={styles.ruNameLink}
                href={`//${window.location.hostname}:${window.location.port}/profile`}
              >
                <Typography sx={styles.ruDisplayName}>
                  {relevantUser.displayName}
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={styles.ruUsername}
              >{`@${relevantUser.username}`}</Typography>
            </Box>
          </Box>
          <Button
            className="followButton"
            variant="contained"
            color="primary"
            size="small"
            sx={styles.followButton}
          >
            Follow
          </Button>
        </Box>
      </Box>

      <Box sx={styles.adSpaceContainer}>
        <img
          style={styles.ad}
          src={process.env.PUBLIC_URL + "/Ad Gray.gif"}
          alt="Logo"
        />
      </Box>
      <Box sx={styles.footerContainer}>
        <Box sx={styles.footerNav}>
          <Link
            underline="hover"
            target="_blank"
            href="/coming-soon"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Terms of Service
            </Typography>
          </Link>
          <Link underline="hover" target="_blank" sx={styles.footerItem}>
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Privacy Policy
            </Typography>
          </Link>
          <Link
            underline="hover"
            target="_blank"
            href="/coming-soon"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Contact Us
            </Typography>
          </Link>
          <Link
            underline="hover"
            target="_blank"
            href="/coming-soon"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              About The Team
            </Typography>
          </Link>
          <Link
            underline="hover"
            target="_blank"
            href="https://github.com/orgs/Project-Chirp/repositories"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              GitHub Repo
            </Typography>
          </Link>
          <Link
            underline="hover"
            target="_blank"
            href="/coming-soon"
            rel="noreferrer"
            sx={styles.footerItem}
          >
            <Typography variant="subtitle2" sx={styles.footerItemText}>
              Docs
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ExpandedPostSidebar;