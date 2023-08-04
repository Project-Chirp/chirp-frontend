import { Box } from "@mui/material";
import SuggestedUserItem from "./SuggestedUsers";
import SidebarFooter from "./SidebarFooter";
import Advertisement from "./Advertisement";
import SearchBar from "../Common/SearchBar";

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
        <SearchBar placeholder="Search Chirp" />
      </Box>
      <SuggestedUserItem />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
