import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footerContainer: {
    width: "100%",
  },
  footerItem: {
    textDecoration: "none",
    paddingRight: "0.75rem",
  },
  footerItemText: {
    "&:hover": {
      textDecoration: "underline",
    },
    color: "gray.main",
    fontSize: "0.75rem",
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    paddingX: 2,
  },
};

const SidebarFooter = () => {
  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.footerNav}>
        <Link
          target="_blank"
          to="/coming-soon"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            Terms of Service
          </Typography>
        </Link>
        <Link
          target="_blank"
          to="/coming-soon"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            Privacy Policy
          </Typography>
        </Link>
        <Link
          target="_blank"
          to="/coming-soon"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            Contact Us
          </Typography>
        </Link>
        <Link
          target="_blank"
          to="/coming-soon"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            About The Team
          </Typography>
        </Link>
        <Link
          target="_blank"
          to="https://github.com/orgs/Project-Chirp/repositories"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            GitHub Repo
          </Typography>
        </Link>
        <Link
          target="_blank"
          to="/coming-soon"
          rel="noreferrer"
          style={styles.footerItem}
        >
          <Typography variant="subtitle2" sx={styles.footerItemText}>
            Docs
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default SidebarFooter;
