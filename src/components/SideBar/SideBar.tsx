import { Box } from "@mui/material";
import SearchBarDropdown from "../Common/SearchBarDropdown";
import Advertisement from "./Advertisement";
import SidebarFooter from "./SidebarFooter";
import SuggestedUserItem from "./SuggestedUsers";

const styles = {
  rightContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    position: "fixed",
    width: "310px",
  },
  searchBarContainer: { paddingTop: 1 },
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBarDropdown placeholder="Search users" />
      </Box>
      <SuggestedUserItem />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
