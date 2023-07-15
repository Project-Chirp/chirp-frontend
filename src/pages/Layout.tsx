import { ReactElement } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Box, Divider, Stack } from "@mui/material";

const styles = {
  container: { height: "auto", justifyContent: "center" },
  divider: { height: "auto" },
  mainContent: { flex: "0 1 600px" },
  nav: { flex: "0 0 275px", height: "100vh", position: "sticky", top: 0 },
  secondaryContent: {
    flex: "0 0 350px",
    paddingLeft: "40px",
  },
};

type LayoutProps = {
  mainContent: ReactElement;
  secondaryContent?: ReactElement;
};

const Layout = ({ mainContent, secondaryContent }: LayoutProps) => {
  return (
    <Stack
      direction="row"
      sx={styles.container}
      divider={<Divider orientation="vertical" sx={styles.divider} />}
    >
      <Box component="header" sx={styles.nav}>
        <NavBar />
      </Box>
      <Box sx={styles.mainContent}>{mainContent}</Box>
      <Box sx={styles.secondaryContent}>{secondaryContent}</Box>
    </Stack>
  );
};

export default Layout;
