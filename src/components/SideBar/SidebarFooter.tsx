import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footerItem: {
    textDecoration: "none",
    paddingRight: 10,
  },
  footerItemText: {
    "&:hover": {
      textDecoration: "underline",
    },
    color: "gray.main",
    fontSize: 12,
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    paddingX: 2,
  },
};

const SidebarFooter = () => {
  return (
    <Box component={"nav"} sx={styles.footerNav}>
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
  );
};

export default SidebarFooter;
