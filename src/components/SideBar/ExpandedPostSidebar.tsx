import { Box } from "@mui/material";
import SearchBarDropdown from "../Common/SearchBarDropdown";
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
      <SearchBarDropdown placeholder="Search users" />
      <RelevantUsers />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default ExpandedPostSidebar;
