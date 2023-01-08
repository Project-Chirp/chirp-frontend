import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "../Styles/DMSearchBar.css";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";

const DMSearchBar = () => {
  return (
    <div>
      <Container>
        <SearchRoundedIcon fontSize="large" />
        <TextField
          sx={{ borderRadius: `25px` }}
          variant="filled"
          placeholder="Search Direct Messages"
        />
      </Container>
    </div>
  );
};

export default DMSearchBar;
