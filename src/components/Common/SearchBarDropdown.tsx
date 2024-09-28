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
  Typography,
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
  autocomplete: {
    "&.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root": { paddingX: 1 },
    position: "relative",
    padding: 0,
  },
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SelectedUser[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const debouncedFetch = useMemo(
    () => debounce((keywords: string) => fetchUsers(keywords), 100),
    []
  );

  const fetchUsers = async (keywords: string) => {
    setLoading(true);
    if (keywords.length === 0) {
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

      if (keywords.trim() === "") {
        setSearchOptions([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSearchOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedFetch(keywords);
  }, [keywords]);

  const handleInputChange = (newInputValue: string) => {
    setKeywords(newInputValue);

    if (newInputValue.trim() === "") {
      setSearchOptions([]);
    }
  };

  const handleSelect = (selectedUsername: string) => {
    setKeywords("");
    setSearchOptions([]);
    inputRef.current?.blur();
    navigate(`/${selectedUsername}`);
  };

  const handleClear = () => {
    setKeywords("");
    setSearchOptions([]);
    setFocusSearchBar(false);
  };

  return (
    <Box sx={styles.box}>
      <Autocomplete
        disablePortal
        fullWidth
        filterOptions={(x) => x}
        getOptionLabel={() => ""}
        forcePopupIcon={false}
        id="search"
        value={null}
        inputValue={keywords}
        ListboxProps={{ style: styles.listBox }}
        loading={!keywords && loading}
        loadingText="Start typing to search..."
        onChange={(_, value) => value && handleSelect(value.username)}
        onBlur={handleClear}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        onFocus={() => setFocusSearchBar(true)}
        open={focusSearchBar}
        openOnFocus
        options={searchOptions}
        noOptionsText={"No user found"}
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
                  <IconButton onClick={() => setKeywords("")}>
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
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBarDropDown;
