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
    paddingTop: 1,
    position: "fixed",
    width: "310px",
  },
};

const SideBar = () => {
  return (
    <Box sx={styles.rightContent}>
      <SearchBar placeholder="Search Chirp" />
      <SuggestedUserItem />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
