import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <Box sx={styles.rightContent}>
      <Box sx={styles.searchBarContainer}>
        <SearchBarDropdown onSelect={(o) => navigate(`/${o.username}`)} />
      </Box>
      <SuggestedUserItem />
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
