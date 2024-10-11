import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearIcon from "@mui/icons-material/Clear";
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
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SelectedUser } from "../../state/slices/messagesSlice";
import { useNavigate } from "react-router-dom";

type SearchBarDropDownProps = {
  placeholder: string;
};

const styles = {
  listBox: {
    maxHeight: "60vh",
  },
  searchIcon: {
    paddingRight: 0,
    "&.Mui-disabled": {
      color: "gray.main",
    },
  },
  searchIconFocused: {
    paddingRight: 0,
    "&.Mui-disabled": {
      color: "primary.main",
    },
  },
};

const SearchBarDropDown = ({ placeholder }: SearchBarDropDownProps) => {
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SelectedUser[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const fetchUsers = async (keywords: string) => {
    setLoading(true);
    if (keywords.trim() === "") {
      setSearchOptions([]);
      setLoading(false);
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `http://localhost:3001/api/users/searchUsers`,
        {
          params: {
            keyword: keywords,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchOptions(result.data as SelectedUser[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSearchOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () => debounce((keywords: string) => fetchUsers(keywords), 100),
    []
  );

  useEffect(() => {
    debouncedFetch(keywords);
  }, [keywords]);

  const handleSelect = (selectedUsername: string) => {
    setKeywords("");
    setSearchOptions([]);
    inputRef.current?.blur();
    navigate(`/${selectedUsername}`);
  };

  const handleInputChange = (newInputValue: string) => {
    setLoading(true);
    setKeywords(newInputValue);
  };

  const handleClear = () => {
    setKeywords("");
    setSearchOptions([]);
  };

  return (
    <Box>
      <Autocomplete
        disablePortal
        clearOnBlur={false}
        filterOptions={(x) => x}
        forcePopupIcon={false}
        fullWidth
        getOptionLabel={() => ""}
        inputValue={keywords}
        ListboxProps={{ style: styles.listBox }}
        loading={loading}
        noOptionsText={
          !keywords ? "Start typing to search..." : "No user found"
        }
        onBlur={() => setFocusSearchBar(false)}
        onChange={(_, value) => value && handleSelect(value.username)}
        onFocus={() => setFocusSearchBar(true)}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        open={focusSearchBar}
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            inputRef={inputRef}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    disabled
                    sx={
                      focusSearchBar
                        ? styles.searchIconFocused
                        : styles.searchIcon
                    }
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: keywords && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder={placeholder}
            size="small"
          />
        )}
        renderOption={(params, option) => {
          return (
            <ListItemButton
              {...params}
              component="li"
              key={option.userId}
              onClick={() => handleSelect(option.username)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={option.displayName}
                secondary={`@${option.username}`}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondaryTypographyProps={{ variant: "subtitle2" }}
              />
            </ListItemButton>
          );
        }}
        value={null}
      />
    </Box>
  );
};

export default SearchBarDropDown;
