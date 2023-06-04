import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, InputAdornment, TextField } from "@mui/material";

const styles = {
  box: {
    margin: "auto",
    padding: 1,
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
    },
  },
};

type SearchBarProps = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <Box sx={styles.box}>
      <TextField
        fullWidth
        hiddenLabel
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        size="small"
        sx={styles.searchField}
      />
    </Box>
  );
};

export default SearchBar;
