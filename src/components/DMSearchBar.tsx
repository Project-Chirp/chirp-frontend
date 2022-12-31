import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../Styles/DMSearchBar.css";

const DMSearchBar = () => {
  return (
    <div className="searchflexbox">
      <SearchIcon />
      <input
        className="searchDM"
        type="text"
        placeholder="Search Direct Message"
      />
    </div>
  );
};

export default DMSearchBar;
