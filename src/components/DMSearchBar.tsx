import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "../Styles/DMSearchBar.css";
import { InputAdornment, Stack, TextField } from "@mui/material";

const DMSearchBar = () => {
  return (
    //Using a Stack to vary the width of the page
    <Stack sx={{ width: 400, margin: "auto", paddingTop: 1, paddingBottom: 1 }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        hiddenLabel
        placeholder="Search Direct Message"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
          },
          "& .MuiInputLabel-outlined": {
            paddingLeft: "20px",
          },
        }}
      />
    </Stack>
  );
};

export default DMSearchBar;
