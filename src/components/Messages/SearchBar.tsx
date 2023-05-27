import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, Stack, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    //Using a Stack to vary the width of the page
    <Stack sx={{ margin: "auto", padding: 1 }}>
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
        }}
        size="small"
      />
    </Stack>
  );
};

export default SearchBar;
