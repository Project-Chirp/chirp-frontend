import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import MessagesModalListItem from "./MessagesModalListItem";
import { DMList } from "./MessagesModalList";

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

const dmList: DMList[] = [
  {
    displayName: "Michael Stewart",
    username: "MStew",
  },
  {
    displayName: "Benjamin Davidson",
    username: "BenDavid123",
  },
];

const SearchBarMessages = ({ placeholder }: SearchBarProps) => {
  console.log(dmList);
  return (
    <Box sx={styles.box}>
      <Autocomplete
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
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
          );
        }}
        renderOption={(props, option) => {
          return (
            <List component="li" {...props}>
              <MessagesModalListItem dmList={option} />
            </List>
          );
        }}
        options={dmList}
        getOptionLabel={(option) => option.username}
        id="messages-search"
      />
    </Box>
  );
};

export default SearchBarMessages;
