import { Box, Link, useTheme } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

const styles = {
  footerText: {
    paddingRight: 1.5,
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
  },
};

const SidebarFooter = () => {
  const theme = useTheme();
  return (
    <Box component="nav" sx={styles.footerNav}>
      <Link
        color={theme.typography.body2.color}
        component={Routerlink}
        sx={styles.footerText}
        target="_blank"
        to="/coming-soon"
        underline="hover"
        variant="body2"
      >
        Terms of Service
      </Link>
      <Link
        color={theme.typography.body2.color}
        component={Routerlink}
        sx={styles.footerText}
        target="_blank"
        to="/coming-soon"
        underline="hover"
        variant="body2"
      >
        Privacy Policy
      </Link>
      <Link
        color={theme.typography.body2.color}
        component={Routerlink}
        sx={styles.footerText}
        target="_blank"
        to="/coming-soon"
        underline="hover"
        variant="body2"
      >
        Contact Us
      </Link>
      <Link
        color={theme.typography.body2.color}
        component={Routerlink}
        sx={styles.footerText}
        target="_blank"
        to="/coming-soon"
        underline="hover"
        variant="body2"
      >
        About The Team
      </Link>
      <Link
        color={theme.typography.body2.color}
        href="https://github.com/Project-Chirp"
        sx={styles.footerText}
        target="_blank"
        underline="hover"
        variant="body2"
      >
        GitHub
      </Link>
      <Link
        color={theme.typography.body2.color}
        component={Routerlink}
        sx={styles.footerText}
        target="_blank"
        to="/coming-soon"
        underline="hover"
        variant="body2"
      >
        Docs
      </Link>
    </Box>
  );
};

export default SidebarFooter;
