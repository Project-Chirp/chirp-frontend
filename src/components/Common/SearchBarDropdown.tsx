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
import { useLocation, useNavigate } from "react-router-dom";

type SearchBarProps = {
  placeholder: string;
};

const styles = {
  autocomplete: {
    "&.MuiAutocomplete-input": { paddingX: 0 },
    position: "relative",
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

const SearchBarDropDown = ({ placeholder }: SearchBarProps) => {
  const debouncedFetch = useMemo(
    () => debounce((keywords: string) => fetchUsers(keywords), 100),
    []
  );
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SelectedUser[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

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
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (newInputValue: string) => {
    setKeywords(newInputValue);

    if (newInputValue.trim() === "") {
      setSearchOptions([]);
    }
  };

  const onSelect = (selectedUsername: string) => {
    inputRef.current?.blur();
    navigate(`/${selectedUsername}`);
  };

  useEffect(() => {
    debouncedFetch(keywords);
  }, [keywords]);

  useEffect(() => {
    setKeywords("");
    setSearchOptions([]);
  }, [location]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        disablePortal
        fullWidth
        freeSolo
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.displayName} @${option.username}`
        }
        id="search"
        inputValue={keywords}
        ListboxProps={{ sx: styles.listBox }}
        loading={loading}
        loadingText="Start typing to search..."
        onChange={(_, value) => {
          if (value && typeof value !== "string") {
            onSelect(value.username);
          }
        }}
        onBlur={() => setFocusSearchBar(false)}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        onFocus={() => setFocusSearchBar(true)}
        open={focusSearchBar}
        openOnFocus
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            hiddenLabel
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
              inputRef: inputRef,
            }}
            placeholder={placeholder}
            size="small"
          />
        )}
        renderOption={(props, option) => {
          return (
            <ListItemButton
              component="li"
              {...props}
              onClick={() => onSelect(option.username)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {option.displayName}
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle2">{`@${option.username}`}</Typography>
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

export default SearchBarDropDown;
