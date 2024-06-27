import { Box } from "@mui/material";
import SidebarFooter from "./SidebarFooter";
import RelevantUsers from "./RelevantUsers";
import Advertisement from "./Advertisement";
import SearchBar from "../Common/SearchBar";

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
