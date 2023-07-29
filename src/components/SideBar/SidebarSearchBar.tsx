import { Box } from "@mui/material";
import React from "react";
import SearchBar from "../Common/SearchBar";

const styles = {
  searchBarContainer: {
    width: "100%",
  },
};

const SidebarSearchBar = () => {
  return (
    <Box sx={styles.searchBarContainer}>
      <SearchBar placeholder="Search Chirp" />
    </Box>
  );
};

export default SidebarSearchBar;
