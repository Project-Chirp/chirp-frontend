import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

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

const handleSearch = () => {
  console.log("handleSearch");
};

const SearchBarMessages = ({ placeholder }: SearchBarProps) => {
  return (
    <Box sx={styles.box}>
      <TextField
        fullWidth
        hiddenLabel
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchRoundedIcon />
              </IconButton>
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

export default SearchBarMessages;
