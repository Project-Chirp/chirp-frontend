import { ReactElement } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Box, Divider, Stack } from "@mui/material";

const styles = {
  container: { height: "100%", justifyContent: "center" },
  mainContent: { flex: "0 1 600px" },
  nav: { flex: "0 0 275px" },
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
      divider={<Divider orientation="vertical" />}
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
