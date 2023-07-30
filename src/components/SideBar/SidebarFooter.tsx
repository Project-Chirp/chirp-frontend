import { Box, Link } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

const styles = {
  footerText: {
    color: "gray.main",
    fontSize: 12,
    paddingRight: 1.5,
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

const SidebarFooter = () => {
  return (
    <Box component="nav" sx={styles.footerNav}>
      <Link
        component={Routerlink}
        sx={styles.footerText}
        to="/coming-soon"
        underline="hover"
        variant="subtitle2"
      >
        Terms of Service
      </Link>
      <Link
        component={Routerlink}
        sx={styles.footerText}
        to="/coming-soon"
        underline="hover"
        variant="subtitle2"
      >
        Privacy Policy
      </Link>
      <Link
        component={Routerlink}
        sx={styles.footerText}
        to="/coming-soon"
        underline="hover"
        variant="subtitle2"
      >
        Contact Us
      </Link>
      <Link
        component={Routerlink}
        sx={styles.footerText}
        to="/coming-soon"
        underline="hover"
        variant="subtitle2"
      >
        About The Team
      </Link>
      <Link
        href="https://github.com/Project-Chirp"
        sx={styles.footerText}
        target="_blank"
        underline="hover"
        variant="subtitle2"
      >
        GitHub
      </Link>
      <Link
        component={Routerlink}
        sx={styles.footerText}
        to="/coming-soon"
        underline="hover"
        variant="subtitle2"
      >
        Docs
      </Link>
    </Box>
  );
};

export default SidebarFooter;
