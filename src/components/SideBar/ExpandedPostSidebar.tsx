import { Box } from "@mui/material";
import SearchBar from "../Common/SearchBar";
import Advertisement from "./Advertisement";
import RelevantUsers from "./RelevantUsers";
import SidebarFooter from "./SidebarFooter";

const styles = {
  rightContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    paddingTop: 1,
    position: "fixed",
    width: "310px",
  },
};

const ExpandedPostSidebar = () => {
  return (
    <Box sx={styles.rightContent}>
      <SearchBar placeholder="Search Chirp" />
      <RelevantUsers />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default ExpandedPostSidebar;
