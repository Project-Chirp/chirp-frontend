import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "../Styles/DMSearchBar.css";
import { InputAdornment, TextField } from "@mui/material";

const DMSearchBar = () => {
  return (
    <div>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        hiddenLabel
        variant="filled"
        placeholder="Search Direct Message"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
          },
        }}
      />
    </div>
  );
};

export default DMSearchBar;
