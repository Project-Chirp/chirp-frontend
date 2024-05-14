import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../state/slices/userSlice";
import axios from "axios";

type SearchBarProps = {
  placeholder: string;
  onSearchOpen: () => void;
  onSearchClose: () => void;
  onSelect: (state?: number) => void;
};

const styles = {
  autocomplete: { "&.MuiAutocomplete-input": { paddingLeft: 0 } },
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
  displayName: {
    fontWeight: "bold",
  },
  searchIcon: { paddingRight: 0 },
};

const SearchBar = ({
  placeholder,
  onSearchClose,
  onSearchOpen,
  onSelect,
}: SearchBarProps) => {
  const [keywords, setKeywords] = useState("");
  const [userList, setUserList] = useState<User[]>([]);

  const fetchUsers = async ({ pageParam = 1 }) => {
    const result = await axios.get("http://localhost:3001/api/users/getUsers", {
      params: {
        keyword: keywords,
        offset: pageParam,
      },
    });
    setUserList(result.data as User[]);
  };

  useEffect(() => {
    fetchUsers({ pageParam: 1 });
  }, [keywords]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        id="messages-search"
        popupIcon={false}
        onOpen={onSearchOpen}
        onClose={onSearchClose}
        options={userList}
        openOnFocus
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              onChange={(word) => setKeywords(word.target.value)}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disabled sx={styles.searchIcon}>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder={placeholder}
              size="small"
            />
          );
        }}
        renderOption={(_, option) => {
          return (
            <ListItemButton
              key={option.userId}
              component="li"
              onClick={() => onSelect(option.userId)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Box>
                    <Typography sx={styles.displayName} variant="body2">
                      {option.displayName}
                    </Typography>
                    <Typography variant="body2">{`@${option.username}`}</Typography>
                  </Box>
                }
              />
            </ListItemButton>
          );
        }}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBar;
